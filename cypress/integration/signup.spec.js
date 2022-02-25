import signUp from '../pages/SignupPage'
import signupFactory from '../factories/signupFactory'
import faker from 'faker'
import SignupPage from '../pages/SignupPage'

describe('Signup', () => {

    //    beforeEach(function() {
    //        cy.fixture('deliver.json').then((d) => {
    //           this.deliver = d 
    //        })
    //    })

    it('User should be a deliver', function () {

        var deliver = signupFactory.deliver()

        signUp.go()
        signUp.fillForm(deliver)
        signUp.submit()

        const expectedMessage = 'Recebemos os seus dados. Fique de olho na sua caixa de email, pois e em breve retornamos o contato.'
        signUp.modalContentShouldBe(expectedMessage)

    })

    it('incorrect document', function () {

        var deliver = signupFactory.deliver()

        deliver.cpf = '000000141AA'

        signUp.go()
        signUp.fillForm(deliver)
        signUp.submit()
        signUp.alertMessageShouldBe('Oops! CPF inválido')
    })

    it('incorrect email', function () {

        var deliver = signupFactory.deliver()

        deliver.email = 'user.com.br'

        signUp.go()
        signUp.fillForm(deliver)
        signUp.submit()
        signUp.alertMessageShouldBe('Oops! Email com formato inválido.')
    })

    context('required fields', function () {

        const messages = [
            { field: 'name', output: 'É necessário informar o nome' },
            { field: 'cpf', output: 'É necessário informar o CPF' },
            { field: 'email', output: 'É necessário informar o email' },
            { field: 'postalcode', output: 'É necessário informar o CEP' },
            { field: 'number', output: 'É necessário informar o número do endereço' },
            { field: 'delivery_method', output: 'Selecione o método de entrega' },
            { field: 'cnh', output: 'Adicione uma foto da sua CNH' }
        ]

        before(function () {
            signUp.go()
            signUp.submit()
        })

        messages.forEach(function (msg) {
            it(`${msg.field} is required`, function () {
                signUp.alertMessageShouldBe(msg.output)
            })
        })
    })
})