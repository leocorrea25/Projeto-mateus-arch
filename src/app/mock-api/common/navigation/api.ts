import { Injectable } from '@angular/core';
import { cloneDeep } from 'lodash-es';
import { FuseNavigationItem } from '@fuse/components/navigation';
import { FuseMockApiService } from '@fuse/lib/mock-api';
import { UserService } from 'app/core/user/user.service';
import { AuthUtils } from 'app/core/auth/auth.utils';
import { User } from 'app/core/user/user.types';
import { BehaviorSubject, map, Observable, ReplaySubject, tap } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class NavigationMockApi {
    private user: any = null;
    private _user: BehaviorSubject<User | null> = new BehaviorSubject<User | null>(null);


    /**
     * Constructor
     */
    constructor(
        private _fuseMockApiService: FuseMockApiService,
        private _userService: UserService
    ) {
        this.loadUserFromToken()
        // Fetch user data and register handlers
        this.fetchUserData();
    }

    private loadUserFromToken(): void {
        const token = localStorage.getItem('accessToken'); // Substituído por 'accessToken'
        if (token && !AuthUtils.isTokenExpired(token)) {
            const decodedToken = AuthUtils._decodeToken(token);
            const user: User = {
                nameid: decodedToken.nameId || '',
                email: decodedToken.email || '',
                saller: decodedToken.role || '',
            };
            this._user.next(user);
            console.log(this._user);
            
        } else {
            console.warn('Token inválido ou expirado');
            this._user.next(null);
        }
    }

    /**
     * Fetch user data and register handlers
     */
    private fetchUserData(): void {
        // Se o usuário já foi carregado do token, use diretamente
        if (this._user.getValue()) {
            console.log('User already loaded from token:', this._user.getValue());
            this.user = this._user.getValue();
            this.registerHandlers();
            return;
        }
    
        // Caso contrário, faça a requisição para obter os dados do usuário
        this._userService.get().subscribe({
            next: (response) => {
                this.user = response;
                console.log('User fetched:', this.user);
    
                // Register Mock API handlers after user data is fetched
                this.registerHandlers();
            },
            error: (err) => {
                console.error('Error fetching user data:', err);
    
                // Register default handlers even if user data fails
                this.registerHandlers();
            },
        });
    }
    

    /**
     * Register Mock API handlers
     */
    private registerHandlers(): void {
        // if (!this.user) {
        //     // Register default handlers if user data is not available
        //     console.warn('User data is not available; returning default navigation.');
        //     this._fuseMockApiService.onGet('api/common/navigation').reply(() => {
        //         return [
        //             200,
        //             {
        //                 compact: this.createDefaultNavigation(),
        //                 default: this.createDefaultNavigation(),
        //                 futuristic: this.createDefaultNavigation(),
        //                 horizontal: this.createDefaultNavigation(),
        //             },
        //         ];
        //     });
        //     return;
        // }

        // Register the navigation based on the user type
        this._fuseMockApiService.onGet('api/common/navigation').reply(() => {
            const navigation = this.getNavigationForUserType();
            return [
                200,
                {
                    compact: cloneDeep(navigation),
                    default: cloneDeep(navigation),
                    futuristic: cloneDeep(navigation),
                    horizontal: cloneDeep(navigation),
                },
            ];
        });
    }

    /**
     * Create default navigation
     */
    private createDefaultNavigation(): FuseNavigationItem[] {
        return [
            {
                id: 'scheduling',
                title: 'Compra',
                type: 'basic',
                icon: 'heroicons_solid:shopping-cart',
                link: '/Compra',
            },
            {
                id: 'counter',
                title: 'Balcão',
                type: 'basic',
                icon: 'heroicons_solid:shopping-bag',
                link: '/Balcao',
            },
        ];
    }

    /**
     * Get navigation based on user type
     */
    private getNavigationForUserType(): FuseNavigationItem[] {
        console.log('Determining navigation for user:', this.user);

        if (this.user?.saller === 'Seller') {
            // Navigation for sellers
            return [
                {
                    id: 'inicio',
                    title: 'inicio',
                    type: 'basic',
                    icon: 'heroicons_solid:shopping-bag',
                    link: '/Inicio',
                },
                {
                    id: 'counter',
                    title: 'Balcão',
                    type: 'basic',
                    icon: 'heroicons_solid:shopping-bag',
                    link: '/Balcao',
                },
                {
                    id: 'createProducts',
                    title: 'Criar Produto',
                    type: 'basic',
                    icon: 'heroicons_solid:shopping-bag',
                    link: '/Criar-Produto',
                },
                {
                    id: 'Listar-Produtos',
                    title: 'Listar Produtos',
                    type: 'basic',
                    icon: 'heroicons_solid:shopping-bag',
                    link: '/Listar-Produtos',
                }
            ];
        } else {
            // Navigation for normal users (buyers)
            return [
                {
                    id: 'inicio',
                    title: 'inicio',
                    type: 'basic',
                    icon: 'heroicons_solid:shopping-bag',
                    link: '/Inicio'
                },
                {
                    id: 'scheduling',
                    title: 'Compra',
                    type: 'basic',
                    icon: 'heroicons_solid:shopping-cart',
                    link: '/Compra',
                },
                {
                    id: 'clientOrders',
                    title: 'Pedidos',
                    type: 'basic',
                    icon: 'heroicons_solid:shopping-cart',
                    link: '/Pedidos',
                }

            ];
        }
    }
}
