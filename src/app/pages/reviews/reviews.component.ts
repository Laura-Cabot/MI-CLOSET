import { AfterViewInit, Component, ElementRef, QueryList, ViewChildren } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-reviews',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.css']
})
export class ReviewsComponent implements AfterViewInit {
  // reseñas ficticias con avatar + estrellas
  reviews = [
    { 
      name: 'Mariana G.', 
      text: 'La calidad es excelente. Llegó muy rápido.', 
      stars: 5,
      avatar: 'https://i.pravatar.cc/100?img=5'
    },
    { 
      name: 'Juan P.', 
      text: 'Muy buen envío y atención. Recomendable.', 
      stars: 4,
      avatar: 'https://i.pravatar.cc/100?img=12'
    },
    { 
      name: 'Carla R.', 
      text: 'Las telas son cómodas y el talle perfecto.', 
      stars: 5,
      avatar: 'https://i.pravatar.cc/100?img=20'
    },
    { 
      name: 'Sofía L.', 
      text: 'Buena experiencia, volvería a comprar.', 
      stars: 4,
      avatar: 'https://i.pravatar.cc/100?img=27'
    },
    { 
      name: 'Diego A.', 
      text: 'Calidad-precio equilibrado, me gustó.', 
      stars: 4,
      avatar: 'https://i.pravatar.cc/100?img=33'
    }
  ];

  @ViewChildren('card', { read: ElementRef }) cards!: QueryList<ElementRef<HTMLDivElement>>;

  ngAfterViewInit(): void {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        const el = entry.target as HTMLElement;
        const indexAttr = el.getAttribute('data-index');
        if (!indexAttr) return;
        if (entry.isIntersecting) {
          el.classList.add('in-view');
          observer.unobserve(el);
        }
      });
    }, { threshold: 0.15 });

    this.cards.forEach((c, i) => {
      const native = c.nativeElement;
      native.setAttribute('data-index', String(i));
      native.style.animationDelay = `${i * 140}ms`; // stagger efecto
      observer.observe(native);
    });
  }
}
