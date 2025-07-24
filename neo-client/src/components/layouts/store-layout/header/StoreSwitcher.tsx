import { ChevronsUpDown, PlusIcon, StoreIcon } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

import { Button } from '@/components/ui/Button'
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
    CommandSeparator
} from '@/components/ui/command'
import {
	Popover,
	PopoverContent,
	PopoverTrigger
} from '@/components/ui/popover'

import { STORE_URL } from '@/config/url.config'

import { IStore } from '@/shared/types/store.interface'
import { CreateStoreModal } from '@/components/ui/modals/CreateStoreModal'

interface StoreSwitcherProps {
	items: IStore[]
}

export function StoreSwitcher({ items }: StoreSwitcherProps) {
	const router = useRouter()
	const [isOpen, setIsOpen] = useState(false)

	const onStoreSelect = (storeId: string) => {
		setIsOpen(false)
		router.push(STORE_URL.home(storeId))
	}

	return (
		<Popover open={isOpen} onOpenChange={setIsOpen}>
			<PopoverTrigger asChild>
				<Button
					value='outline'
					size='sm'
					role='combobox'
					aria-expanded={isOpen}
					aria-label='Select store'
					className='w-52'
				>
					<StoreIcon className='mr-2 size-4' />
					Current store{' '}
					<ChevronsUpDown className='ml-auto size-4 shrink-0' />
				</Button>
			</PopoverTrigger>
			<PopoverContent className='w-52 p-0'>
				<Command>
					<CommandList>
						<CommandInput placeholder='Find store...' />
						<CommandEmpty>Not found.</CommandEmpty>
                        <CommandGroup heading="Store">
                            {items.map(store => (
                                <CommandItem key={store.id} onSelect={() => onStoreSelect(store.id)} className='text-sm'>
                                      <StoreIcon className='mr-2 size-4'/>
                                      <div className='line-clamp-1'>
                                        {store.title}
                                      </div>
                                </CommandItem>
                            )) }
                        </CommandGroup>
					</CommandList>
                    <CommandSeparator />
                    <CommandList>
                        <CommandGroup>
                            <CreateStoreModal>
                                <CommandItem>
                                    <PlusIcon className='mr-2 size-4'/>
                                    Create store
                                </CommandItem>
                            </CreateStoreModal>
                        </CommandGroup>
                    </CommandList>
				</Command>
			</PopoverContent>
		</Popover>
	)
}
