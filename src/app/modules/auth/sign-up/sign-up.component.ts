import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { fuseAnimations } from '@fuse/animations';
import { FuseAlertType } from '@fuse/components/alert';
import { AuthService } from 'app/core/auth/auth.service';
import { crateUserRequest } from 'app/shared/request/create-user.request';

@Component({
    selector: 'auth-sign-up',
    templateUrl: './sign-up.component.html',
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class AuthSignUpComponent implements OnInit {
    @ViewChild('signUpNgForm') signUpNgForm: NgForm;

    alert: { type: FuseAlertType; message: string } = {
        type: 'success',
        message: ''
    };
    signUpForm: UntypedFormGroup;
    showAlert: boolean = false;

    /**
     * Constructor
     */
    constructor(
        private _authService: AuthService,
        private _formBuilder: UntypedFormBuilder,
        private _router: Router
    ) {}

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
        // Criação do formulário com os campos adicionais
        this.signUpForm = this._formBuilder.group({
            name: ['', Validators.required],
            email: ['', [Validators.required, Validators.email]],
            password: ['', Validators.required],
            phoneNumber: ['', Validators.required],
            isSeller: [false, Validators.required],
            postalCodeAddress: ['', Validators.required],
            numberAddress: ['', Validators.required],
            street: ['', Validators.required],
            city: ['', Validators.required],
            agreements: ['', Validators.requiredTrue]
        });
    }
    
    signUp(): void {
    
        // Criação do objeto user a partir do formulário
        let user: crateUserRequest = {
            name: this.signUpForm.get('name')?.value,
            email: this.signUpForm.get('email')?.value,
            password: this.signUpForm.get('password')?.value,
            phoneNumber: this.signUpForm.get('phoneNumber')?.value,
            isSeller: this.signUpForm.get('isSeller')?.value,
            postalCodeAddress: this.signUpForm.get('postalCodeAddress')?.value,
            numberAddress: this.signUpForm.get('numberAddress')?.value,
            street: this.signUpForm.get('street')?.value,
            city: this.signUpForm.get('city')?.value
        };
    
        // Desabilita o formulário enquanto o processo de cadastro está em andamento
        this.signUpForm.disable();
    
        // Oculta o alerta
        this.showAlert = false;
    
        // Chama o serviço de sign up passando o objeto user
        this._authService.signUp(user).subscribe(
            (response) => {
                // Navega para a página de confirmação
                this._router.navigateByUrl('/confirmation-required');
            },
            (error) => {
                // Reabilita o formulário
                this.signUpForm.enable();
    
                // Reseta o formulário
                this.signUpNgForm.resetForm();
    
                // Define o alerta de erro
                this.alert = {
                    type: 'error',
                    message: error?.message || 'Something went wrong, please try again.'
                };
    
                // Exibe o alerta
                this.showAlert = true;
            }
        );
    }
    
}
