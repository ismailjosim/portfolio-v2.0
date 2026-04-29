import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs'
import { TrendingUp, Eye, Heart, MessageSquare } from 'lucide-react'

interface BlogMetrics {
	totalBlogs: number
	totalViews: number
	totalLikes: number
	totalComments: number
	averageViews: number
}

interface ChartData {
	name: string
	value: number
}

interface BlogInsightsCardProps {
	metrics: BlogMetrics
	topPosts?: ChartData[]
}

export const BlogInsightsCard = ({
	metrics,
	topPosts = [],
}: BlogInsightsCardProps) => {
	const chartData = topPosts.length > 0 ? topPosts : generateMockData()
	const maxValue = Math.max(...chartData.map((d) => d.value), 1)

	return (
		<Card>
			<CardHeader>
				<CardTitle className='text-xl'>Blog Insights</CardTitle>
			</CardHeader>
			<CardContent>
				<Tabs defaultValue='overview' className='w-full'>
					<TabsList className='grid w-full grid-cols-2'>
						<TabsTrigger value='overview'>Overview</TabsTrigger>
						<TabsTrigger value='performance'>Performance</TabsTrigger>
					</TabsList>

					<TabsContent value='overview' className='space-y-4 mt-4'>
						<div className='grid grid-cols-2 md:grid-cols-4 gap-3'>
							<MetricBox
								icon={MessageSquare}
								label='Total Posts'
								value={metrics.totalBlogs}
							/>
							<MetricBox
								icon={Eye}
								label='Total Views'
								value={formatNumber(metrics.totalViews)}
							/>
							<MetricBox
								icon={Heart}
								label='Total Likes'
								value={formatNumber(metrics.totalLikes)}
							/>
							<MetricBox
								icon={MessageSquare}
								label='Total Comments'
								value={formatNumber(metrics.totalComments)}
							/>
						</div>

						<div className='pt-4 border-t'>
							<p className='text-sm font-medium mb-2'>Engagement Rate</p>
							<p className='text-2xl font-bold mb-2'>
								{metrics.totalBlogs > 0
									? (
											((metrics.totalLikes + metrics.totalComments) /
												(metrics.totalBlogs * 10)) *
											100
										).toFixed(1)
									: 0}
								%
							</p>
							<div className='w-full bg-muted rounded-full h-2'>
								<div
									className='bg-linear-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all'
									style={{
										width: `${Math.min(
											((metrics.totalLikes + metrics.totalComments) /
												(metrics.totalBlogs * 10)) *
												100,
											100,
										)}%`,
									}}
								/>
							</div>
						</div>
					</TabsContent>

					<TabsContent value='performance' className='mt-4'>
						<div className='space-y-3'>
							{chartData.map((post, index) => (
								<div key={index} className='space-y-1'>
									<div className='flex items-center justify-between text-sm'>
										<span className='font-medium'>{post.name}</span>
										<span className='text-muted-foreground'>
											{formatNumber(post.value)}
										</span>
									</div>
									<div className='w-full bg-muted rounded-full h-2'>
										<div
											className='bg-linear-to-r from-blue-500 to-cyan-500 h-2 rounded-full transition-all'
											style={{
												width: `${(post.value / maxValue) * 100}%`,
											}}
										/>
									</div>
								</div>
							))}
						</div>
					</TabsContent>
				</Tabs>
			</CardContent>
		</Card>
	)
}

interface MetricBoxProps {
	icon: React.ComponentType<{ className?: string }>
	label: string
	value: string | number
}

const MetricBox = ({ icon: Icon, label, value }: MetricBoxProps) => {
	return (
		<div className='space-y-1'>
			<div className='flex items-center gap-1'>
				<Icon className='w-3.5 h-3.5 text-muted-foreground' />
				<p className='text-xs text-muted-foreground font-medium'>{label}</p>
			</div>
			<p className='text-xl font-bold'>{value}</p>
		</div>
	)
}

function formatNumber(num: number): string {
	if (num >= 1000000) {
		return (num / 1000000).toFixed(1) + 'M'
	}
	if (num >= 1000) {
		return (num / 1000).toFixed(1) + 'K'
	}
	return num.toString()
}

function generateMockData(): ChartData[] {
	return [
		{ name: 'Post 1', value: 400 },
		{ name: 'Post 2', value: 600 },
		{ name: 'Post 3', value: 300 },
		{ name: 'Post 4', value: 800 },
		{ name: 'Post 5', value: 500 },
	]
}
