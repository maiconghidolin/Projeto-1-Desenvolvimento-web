import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './main.html';
import '../imports/banco.js';

Meteor.startup(function() {
    $('[data-toggle="tooltip"]').tooltip()
    $('[data-toggle="popover"]').popover()
    $('.carousel').carousel({
        interval: 2000
    })
    $(window).scroll(function() {
        if ($(this).scrollTop() > 5) {
            $("#menu").addClass("slide-menu");
            $("#navheader").addClass("slide-navheader");
            $(".header-box").css("color", "#000");
        } else {
            if ($(this).scrollTop() <= 5) {
                $("#menu").removeClass("slide-menu");
                $("#navheader").removeClass("slide-navheader");
                $(".header-box").css("color", "#fff");
            }
        }
    });
});


Template.body.helpers({
    usuario: function() {
        console.log(Meteor.user());
        if (Meteor.user()) {
            return Meteor.user().username;
        } else {
            return "anônimo";
        }
    }
});


Template.botaoJanelaCadastro.events({
    'click #btnAdicionarImagem': function(event) {
        $("#modalCadastroImagem").modal('show');
    }
});

Template.janelaCadastro.events({
    'submit #formCadastro': function(event) {
        Imagens.insert({ src: event.target.txtUrl.value, title: event.target.txtTitle.value, author: event.target.txtAuthor.value, created: new Date(), stars: 0, createdBy: Meteor.user()._id });
        $("#modalCadastroImagem").modal('hide');
        return false;
    }
});

/*var listaImagens = [
	{
		src: "img1.jpg",
        title: "Xjotão",
        author: "A"
	},
	{
		src: "img2.jpg",
        title: "GSR",
        author: "B"
	},
	{
		src: "img3.jpg",
        title: "Hornetão",
        author: "C"
	},
	{
		src: "img4.jpeg",
        title: "Banditão",
        author: "D"
	}
];
Template.templateImagens.helpers({vetorImagens: listaImagens});*/

Template.templateImagens.helpers({
    vetorImagens: function() {
        if (Session.get("usuarioFiltro")) { // tem filtro ativo
            return Imagens.find({ createdBy: Session.get("usuarioFiltro") }, { sort: { createdOn: -1, stars: -1 } });
        } else { // nao tem filtro ativo; busca todas
            return Imagens.find({}, { sort: { createdOn: -1, stars: -1 } });
        }
    },
    getUser: function(user_id) {
        var user = Meteor.users.findOne({ _id: user_id });
        console.log(user);
        if (user) {
            return user.username;
        } else {
            return "desconhecido";
        }
    },
    filtro_ativo: function() {
        if (Session.get("usuarioFiltro"))
            return true;
        else
            return false;
    },
    getUsuarioFiltro: function() {
        var user = Meteor.users.findOne({ _id: Session.get("usuarioFiltro") });
        return user.username;
    }
});

Template.templateImagens.events({
    'mouseenter img': function(event) {
        $(event.target).css("transform", "scale(1.1)");
    },
    'mouseleave img': function(event) {
        $(event.target).css("transform", "scale(1.0)");
    },
    'click #btnDeletarImagem': function(event) {
        var image_id = this._id; // captura o _id do item que recebeu o evento
        $("#" + image_id).hide('slow', function() {
            Imagens.remove({ "_id": image_id }); // deleta com base no _id
        });
    },
    'click #avaliaImagem': function(event) {
        var image_id = this.image_id; // captura o _id do item que recebeu o evento
        var numeroEstrelas = $(event.currentTarget).data('userrating');
        Imagens.update({ _id: image_id }, { $set: { stars: numeroEstrelas } });
        console.log(numeroEstrelas);
    },
    'click .filtro': function(event) {
        Session.set("usuarioFiltro", this.createdBy);
    },
    'click .remover_filtro': function(event) {
        Session.set("usuarioFiltro", undefined);
    }
});

Accounts.ui.config({
    passwordSignupFields: "USERNAME_AND_EMAIL"
});


/*<script src="js/jquery.js"></script>
    <script src="js/jquery.validate.min.js"></script>
    <script src="bootstrap/bootstrap.min.js"></script>
    <script type="text/javascript">
        $(document).ready(function() {
            $('[data-toggle="tooltip"]').tooltip()
            $('[data-toggle="popover"]').popover()
            $('.carousel').carousel({
                interval: 2000
            })
            $(window).scroll(function() {
                if ($(this).scrollTop() > 5) {
                    $("#menu").addClass("slide-menu");
                    $("#navheader").addClass("slide-navheader");
                    $(".header-box").css("color", "#000");
                } else {
                    if ($(this).scrollTop() <= 5) {
                        $("#menu").removeClass("slide-menu");
                        $("#navheader").removeClass("slide-navheader");
                        $(".header-box").css("color", "#fff");
                    }
                }
            });

            $("#meuForm").validate({
                rules: {
                    txtNome: "required",
                    txtEmail: {
                        required: true,
                        email: true
                    },
                    txtTelefone: "required",
                    txtSugestao: "required"
                },
                messages: {
                    txtNome: "Informe um nome",
                    txtEmail: {
                        required: "Informe um email",
                        email: "Informe um email válido"
                    },
                    txtTelefone: "Informe um telefone",
                    txtSugestao: "Escreva sua sugestão"
                },
                highlight: function(element) {
                    $(element).closest('.form-group').addClass('has-error');
                },
                unhighlight: function(element) {
                    $(element).closest('.form-group').removeClass('has-error');
                },
                errorElement: 'span',
                errorClass: 'help-block',
                errorPlacement: function(error, element) {
                    if (element.parent('.input-group').length) {
                        error.insertAfter(element.parent());
                    } else {
                        error.insertAfter(element);
                    }
                }
            });

            $("#btnEnviar").click(function() {
                var $btn = $(this).button('loading')
                if ($("#meuForm").valid()) {
                    setTimeout(function() {
                        $("#alertSuccess").show();
                        $btn.button('reset');
                    }, 3000);
                } else {
                    $btn.button('reset');
                    return false;
                }
            });

            $("#btnCancelar").click(
                function() {
                    $("#txtNome").val("");
                    $("#txtEmail").val("");
                    $("#txtTelefone").val("");
                    $("#txtSugestao").val("");
                    $("#alertSuccess").hide();
                }
            );

            $("#btnCloseAlertSuccess").click(
                function() {
                    $("#alertSuccess").hide();
                }
            );

        });

        var scrollToElement = function(el) {
            $('html,body').animate({
                scrollTop: $(el).offset().top - 70
            }, 1000);
        }
    </script>*/