import { Component } from '@angular/core';
import { CategoryItem } from '../../core/Model/category-item';

@Component({
	selector: 'app-categories',
	templateUrl: './categories.component.html',
	styleUrl: './categories.component.scss'
})
export class CategoriesComponent {
	public categories: CategoryItem[] = [
		{ iconClass: 'fa-solid fa-gifts', title: 'Gifts Box', countText: '30 Items' },
		{ iconClass: 'fa-solid fa-couch', title: 'Home &\nLiving Gifts', countText: '25 Items' },
		{ iconClass: 'fa-regular fa-gem', title: 'Jewelry &\nAccessories', countText: '15 Items' },
		{ iconClass: 'fa-solid fa-shirt', title: 'Garment\nCare', countText: '05 Items' },
		{ iconClass: 'fa-solid fa-briefcase', title: 'Office &\nStationery', countText: '30 Items' }
	];
}


