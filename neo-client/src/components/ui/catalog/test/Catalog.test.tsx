import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import { Catalog } from '../Catalog'
import { IProduct } from '@/shared/types/product.interface'
import { ICategory } from '@/shared/types/category.interface'
import { IColor } from '@/shared/types/color.interface'

jest.mock('next/link', () => {
	return ({ children, href }: { children: React.ReactNode; href: string }) => {
		return <a href={href}>{children}</a>
	}
})

jest.mock('../product-card/ProductCard', () => ({
	ProductCard: ({ product }: { product: IProduct }) => (
		<div data-testid={`product-card-${product.id}`}>
			<span>{product.title}</span>
		</div>
	)
}))

describe('Catalog', () => {
	const mockCategory: ICategory = {
		id: 'cat-1',
		title: 'Category 1',
		description: 'Test category',
		createdAt: new Date('2024-01-01').toISOString(),
		storeId: 'store-1'
	}

	const mockColor: IColor = {
		id: '1',
		createdAt: new Date().toISOString(), 
		name: 'White',
		value: '#ffffff',
		storeId: 'store-1'
	  };

	const mockProducts: IProduct[] = [
		{
			id: '1',
			title: 'Product 1',
			description: 'Description 1',
			price: 100,
			images: ['image1.jpg'],
			category: mockCategory,
			storeId: 'store-1',
			reviews: [],      
            color: mockColor
		},
		{
			id: '2',
			title: 'Product 2',
			description: 'Description 2',
			price: 200,
			images: ['image2.jpg'],
			category: mockCategory,
			storeId: 'store-2',
			reviews: [],      
            color: mockColor
		},
		{
			id: '3',
			title: 'Product 3',
			description: 'Description 3',
			price: 300,
			images: ['image3.jpg'],
			category: mockCategory,
			storeId: 'store-3',
			reviews: [],      
            color: mockColor
		}
	]

	const defaultProps = {
		title: 'Test Catalog',
		products: mockProducts
	}

	it('should render catalog title', () => {
		render(<Catalog {...defaultProps} />)

		expect(screen.getByText('Test Catalog')).toBeInTheDocument()
		expect(
			screen.getByRole('heading', { level: 1, name: 'Test Catalog' })
		).toBeInTheDocument()
	})

	it('should render catalog description when provided', () => {
		const description = 'This is a test catalog description'
		render(<Catalog {...defaultProps} description={description} />)

		expect(screen.getByText(description)).toBeInTheDocument()
	})

	it('should render link when link and linkTitle are provided', () => {
		render(
			<Catalog
				{...defaultProps}
				link="/all-products"
				linkTitle="View All"
			/>
		)

		const link = screen.getByRole('link', { name: 'View All' })
		expect(link).toBeInTheDocument()
		expect(link).toHaveAttribute('href', '/all-products')
	})

	it('should render all products', () => {
		render(<Catalog {...defaultProps} />)

		mockProducts.forEach(product => {
			expect(screen.getByTestId(`product-card-${product.id}`)).toBeInTheDocument()
		})
	})

	it('should display "Not found" message when products array is empty', () => {
		render(<Catalog {...defaultProps} products={[]} />)

		expect(screen.getByText('Not found')).toBeInTheDocument()
	})
})