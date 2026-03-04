import { Plus } from 'lucide-react'
import { Button } from './ui/button'

interface SectionHeaderProps {
    title: string
    buttonLabel: string
    onAdd?: () => void
}

export function SectionHeader({
    title,
    buttonLabel,
    onAdd,
}: SectionHeaderProps) {
    return (
        <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-semibold tracking-tight">
                {title}
            </h2>

            <Button onClick={onAdd}>
                <Plus className="w-4 h-4 mr-2" />
                {buttonLabel}
            </Button>
        </div>
    )
}
