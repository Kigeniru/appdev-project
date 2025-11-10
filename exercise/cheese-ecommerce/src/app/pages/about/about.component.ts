import { Component } from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css'],
  standalone: false
})
export class AboutComponent {
  teamMembers = [
    {
      name: 'Amythel Mediavillo',
      role: 'Founder & Master Baker',
      image: 'https://via.placeholder.com/200x200/E91E63/FFFFFF?text=Amythel',
      description: 'Passionate about creating the perfect cheesecake with traditional techniques and premium ingredients.'
    },
    {
      name: 'Ana Dela Cruz',
      role: 'Head Pastry Chef',
      image: 'https://via.placeholder.com/200x200/F8BBD9/FFFFFF?text=Ana',
      description: 'Expert in dessert crafting with 10+ years of experience in artisanal baking.'
    },
    {
      name: 'Sarah Johnson',
      role: 'Flavor Specialist',
      image: 'https://via.placeholder.com/200x200/FCE4EC/FFFFFF?text=Sarah',
      description: 'Bringing unique flavor combinations to life through innovative recipes and techniques.'
    }
  ];

  values = [
    {
      icon: '<svg width="36" height="36" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 21s-6-4.35-9-7.5C1.5 12 1 9.5 3 8c1.5-1.2 3.5-.7 4.5.5L12 12l4.5-3.5C17.5 7.3 19.5 6.8 21 8c2 1.5 1.5 4 0 5.5C18 16.65 12 21 12 21z" stroke="currentColor" stroke-width="2" fill="none"/></svg>',
      title: 'Authenticity',
      description: 'We use traditional recipes and techniques, ensuring every cheesecake is made with genuine care and premium ingredients.'
    },
    {
      icon: '<svg width="36" height="36" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 2v20M4 12h16" stroke="currentColor" stroke-width="2"/><circle cx="12" cy="12" r="7" stroke="currentColor" stroke-width="2" fill="none"/></svg>',
      title: 'Freshness',
      description: 'Committed to baking fresh daily with the finest ingredients, ensuring perfect texture and flavor in every slice.'
    },
    {
      icon: '<svg width="36" height="36" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7 11l5 5 5-5" stroke="currentColor" stroke-width="2" fill="none"/><path d="M12 3v13" stroke="currentColor" stroke-width="2"/></svg>',
      title: 'Community',
      description: 'Building a community of dessert lovers who share our passion for the perfect cheesecake experience.'
    },
    {
      icon: '<svg width="36" height="36" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 2l3 7 7 1-5 5 1 7-6-3-6 3 1-7-5-5 7-1 3-7z" stroke="currentColor" stroke-width="2" fill="none"/></svg>',
      title: 'Innovation',
      description: 'Continuously developing new flavors and techniques while honoring classic cheesecake traditions.'
    }
  ];
}
