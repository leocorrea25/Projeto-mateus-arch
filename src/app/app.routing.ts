import { Route } from '@angular/router';
import { AuthGuard } from 'app/core/auth/guards/auth.guard';
import { NoAuthGuard } from 'app/core/auth/guards/noAuth.guard';
import { LayoutComponent } from 'app/layout/layout.component';
import { InitialDataResolver } from 'app/app.resolvers';

export const appRoutes: Route[] = [
    // Redireciona o caminho vazio para 'Compra'
    { path: '', pathMatch: 'full', redirectTo: 'Inicio' },

    // Redireciona o usuário logado para 'Compra' após o login
    { path: 'signed-in-redirect', pathMatch: 'full', redirectTo: 'Inicio' },

    // Rotas para usuários não autenticados
    {
        path: '',
        canMatch: [NoAuthGuard],
        component: LayoutComponent,
        data: {
            layout: 'empty',
        },
        children: [
            {
                path: 'confirmation-required',
                loadChildren: () =>
                    import('app/modules/auth/confirmation-required/confirmation-required.module').then(
                        (m) => m.AuthConfirmationRequiredModule
                    ),
            },
            {
                path: 'forgot-password',
                loadChildren: () =>
                    import('app/modules/auth/forgot-password/forgot-password.module').then(
                        (m) => m.AuthForgotPasswordModule
                    ),
            },
            {
                path: 'reset-password',
                loadChildren: () =>
                    import('app/modules/auth/reset-password/reset-password.module').then(
                        (m) => m.AuthResetPasswordModule
                    ),
            },
            {
                path: 'sign-in',
                loadChildren: () =>
                    import('app/modules/auth/sign-in/sign-in.module').then((m) => m.AuthSignInModule),
            },
            {
                path: 'sign-up',
                loadChildren: () =>
                    import('app/modules/auth/sign-up/sign-up.module').then((m) => m.AuthSignUpModule),
            },
        ],
    },

    // Rotas para usuários autenticados
    {
        path: '',
        canMatch: [AuthGuard],
        component: LayoutComponent,
        data: {
            layout: 'empty',
        },
        children: [
            {
                path: 'sign-out',
                loadChildren: () =>
                    import('app/modules/auth/sign-out/sign-out.module').then((m) => m.AuthSignOutModule),
            },
            {
                path: 'unlock-session',
                loadChildren: () =>
                    import('app/modules/auth/unlock-session/unlock-session.module').then((m) => m.AuthUnlockSessionModule),
            },
        ],
    },

    // Rotas públicas (exemplo: Landing pages)
    {
        path: '',
        component: LayoutComponent,
        data: {
            layout: 'empty',
        },
        children: [
            {
                path: 'home',
                loadChildren: () =>
                    import('app/modules/landing/home/home.module').then((m) => m.LandingHomeModule),
            },
        ],
    },

    // Rotas para o administrador ou usuário autenticado
    {
        path: '',
        canMatch: [AuthGuard],
        component: LayoutComponent,
        resolve: {
            initialData: InitialDataResolver,
        },
        children: [
            {
                path: 'Inicio',
                loadChildren: () => import('app/modules/admin/example/example.module').then((m) => m.ExampleModule),
            },
            {
                path: 'Compra',
                loadChildren: () =>
                    import('app/modules/admin/scheduling/scheduling.module').then((m) => m.SchedulingModule),
            },
            {
                path: 'Balcao',
                loadChildren: () =>
                    import('app/modules/admin/counter/counter.module').then((m) => m.CounterModule),
            },
            {
                path: 'Pedidos',
                loadChildren: () => 
                    import('app/modules/admin/client-orders/client-orders.module').then((m) => m.ClientOrdersModule)
            },
            {
                path: 'Criar-Produto',
                loadChildren: () => 
                    import('app/modules/admin/create-products/create-products.module').then((m) => m.CreateProductsModule)
            },
            {
                path: 'Listar-Produtos',
                loadChildren: () => 
                    import('app/modules/admin/my-products/my-products.module').then((m) => m.MyProductsModule)
            }
        ],
    },

    // Rota coringa para lidar com 404
    { path: '**', redirectTo: 'Inicio' },
];
