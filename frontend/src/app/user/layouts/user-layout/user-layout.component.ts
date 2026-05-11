import { AfterViewInit, ChangeDetectorRef, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from '../../shared/header/header.component';
import { FooterComponent } from '../../shared/footer/footer.component';
import {
  trigger,
  transition,
  style,
  animate,
  query,
  group
} from '@angular/animations';

@Component({
  selector: 'app-user-layout',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, FooterComponent],
  templateUrl: './user-layout.component.html',
  styleUrl: './user-layout.component.css',
  animations: [
    trigger('routeAnimation', [
      transition('* <=> *', [
        style({ position: 'relative' }),

        query(
          ':enter, :leave',
          [
         style({
  position: 'absolute',
  left: 0,
  top: 0,
  width: '100%',
  height: '100%'
})
          ],
          { optional: true }
        ),

        query(
          ':enter',
          [
            style({
              opacity: 0,
              transform: 'translateY(18px)'
            })
          ],
          { optional: true }
        ),

        group([
          query(
            ':leave',
            [
              animate(
                '180ms ease-out',
                style({
                  opacity: 0,
                  transform: 'translateY(-6px)'
                })
              )
            ],
            { optional: true }
          ),

          query(
            ':enter',
            [
              animate(
                '280ms ease-out',
                style({
                  opacity: 1,
                  transform: 'translateY(0)'
                })
              )
            ],
            { optional: true }
          )
        ])
      ])
    ])
  ]
})
export class UserLayoutComponent implements AfterViewInit {
  constructor(private cdr: ChangeDetectorRef) {}

  ngAfterViewInit(): void {
    this.cdr.detectChanges();
  }

  prepareRoute(outlet: RouterOutlet) {
    return outlet?.activatedRouteData?.['animation'] || 'default';
  }
}