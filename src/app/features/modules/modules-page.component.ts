import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ModuleService, ModuleVm } from '../../core/services/module.service';

@Component({
  selector: 'app-modules-page',
  templateUrl: './modules-page.component.html',
  styleUrls: ['./modules-page.component.scss'],
})
export class ModulesPageComponent implements OnInit {
  loading = true;
  modules: ModuleVm[] = [];
  courseId!: number;

  constructor(
    private api: ModuleService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.courseId = Number(this.route.snapshot.paramMap.get('courseId'));

    this.api.listModules(this.courseId).subscribe({
      next: (mods) => {
        this.modules = [...(mods ?? [])].sort((a, b) => {
          const ai = a.orderIndex ?? Number.MAX_SAFE_INTEGER;
          const bi = b.orderIndex ?? Number.MAX_SAFE_INTEGER;
          return ai - bi;
        });
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      },
    });
  }

  open(module: ModuleVm): void {
    this.router.navigate(['/modules', module.id]);
  }
}
