import { NextResponse } from 'next/server'
import { parseMongooseError } from '@/src/lib/parseMongooseError'
import { connectDB } from '@/src/lib/mongodb'
import Skill from '@/src/models/Skill'

export async function GET(req: Request) {
	try {
		await connectDB()

		const { searchParams } = new URL(req.url)

		const page = Math.max(1, Number(searchParams.get('page') ?? 1))
		const limit = Math.min(
			50,
			Math.max(1, Number(searchParams.get('limit') ?? 10)),
		)

		const category = searchParams.get('category')
		const proficiency = searchParams.get('proficiency')
		const search = searchParams.get('search')
		const isPublished = searchParams.get('isPublished')

		const filter: Record<string, unknown> = {}

		if (category) filter.category = { $regex: category, $options: 'i' }
		if (proficiency) filter.proficiency = proficiency
		if (isPublished !== null && isPublished !== undefined) {
			filter.isPublished = isPublished === 'true'
		}

		if (search) {
			filter.$or = [
				{ name: { $regex: search, $options: 'i' } },
				{ category: { $regex: search, $options: 'i' } },
				{ description: { $regex: search, $options: 'i' } },
			]
		}

		const [skills, total] = await Promise.all([
			Skill.find(filter)
				.select('-__v')
				.sort({ order: 1, category: 1, name: 1 })
				.skip((page - 1) * limit)
				.limit(limit)
				.lean(),

			Skill.countDocuments(filter),
		])

		return NextResponse.json({
			skills,
			pagination: {
				total,
				page,
				limit,
				totalPages: Math.ceil(total / limit),
				hasNext: page * limit < total,
				hasPrev: page > 1,
			},
		})
	} catch (err) {
		console.error('[GET /api/skills]', err)

		return NextResponse.json(
			{ error: 'Failed to fetch skills' },
			{ status: 500 },
		)
	}
}

export async function POST(req: Request) {
	try {
		await connectDB()

		const body = await req.json()
		console.log({ body })

		// Get max order for the category or start at 0
		const maxOrder = await Skill.findOne({ category: body.category })
			.sort({ order: -1 })
			.select('order')

		const skill = await Skill.create({
			...body,
			order: body.order ?? (maxOrder?.order ?? 0) + 1,
		})

		return NextResponse.json(skill, { status: 201 })
	} catch (err: unknown) {
		const errors = parseMongooseError(err)

		if (errors) {
			return NextResponse.json({ errors }, { status: 422 })
		}

		console.error('[POST /api/skills]', err)

		return NextResponse.json(
			{ error: 'Failed to create skill' },
			{ status: 500 },
		)
	}
}
