import { Route } from '@angular/router';

import { allCoursesResolverFn } from '@/lib/courses/resolvers/all-courses.resolver';
import { courseResolverFn } from '@/lib/courses/resolvers/course.resolver';
import { allActiveStudentsResolverFn } from '@/lib/students/resolvers/all-active-students.resolver';
import { studentResolverFn } from '@/lib/students/resolvers/student.resolver';

export const appRoutes: Route[] = [
    {
        path: '',
        pathMatch: 'full',
        loadComponent: () => import('./pages/home/home.component').then((m) => m.HomeComponent),
    },
    {
        path: 'courses',
        loadComponent: () => import('./pages/courses/courses.component').then((m) => m.CoursesComponent),
        runGuardsAndResolvers: 'always',
        resolve: {
            courses: allCoursesResolverFn,
        },
    },
    {
        path: 'courses/:id',
        loadComponent: () => import('./pages/course/course.component').then((m) => m.CourseComponent),
        runGuardsAndResolvers: 'always',
        resolve: {
            course: courseResolverFn,
        },
    },
    {
        path: 'students',
        children: [
            {
                path: ':id',
                loadComponent: () => import('./pages/student/student.component').then((m) => m.StudentComponent),
                runGuardsAndResolvers: 'always',
                resolve: {
                    student: studentResolverFn,
                },
            },
            {
                path: '',
                pathMatch: 'full',
                loadComponent: () => import('./pages/students/students.component').then((m) => m.StudentsComponent),
                runGuardsAndResolvers: 'always',
                resolve: {
                    students: allActiveStudentsResolverFn,
                },
            },
        ],
    },
];
