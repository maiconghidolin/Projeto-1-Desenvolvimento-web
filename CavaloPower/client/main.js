import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './main.html';
import '../imports/banco.js';

Meteor.startup(function() {
    $('[data-toggle="tooltip"]').tooltip();
    $('[data-toggle="popover"]').popover();
    $('.carousel').carousel({
        interval: 2000
    });
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

    scrollToElement = function(el) {
        $('html,body').animate({
            scrollTop: $(el).offset().top - 70
        }, 1000);
    }
});

// ########################## 
//Seção Sobre
// ##########################

var listaSobre = [{
        class: "fa fa-hand-peace-o img-circle",
        descricao: "BIIIRRLLL."
    },
    {
        class: "fa fa-hashtag img-circle",
        descricao: "#13Memo."
    },
    {
        class: "fa fa-camera-retro img-circle",
        descricao: "Sem fotinha no espelho."
    },
    {
        class: "fa fa-headphones img-circle",
        descricao: "Fecha a cara e treina."
    }
];

Template.secaoSobre.helpers({
    vetorSobre: listaSobre
});

// ########################## 
//Seção Preços
// ##########################

var listaPrecos = [{
        valor: "R$ 99,00",
        descricao: "Treinar três vezes por semana. Só para os frangos que não gostam muito de treinar."
    },
    {
        valor: "R$ 119,00",
        descricao: "Treinar quatro vezes por semana. Para os que querem crescer mas não querem treinar muito."
    },
    {
        valor: "R$ 149,00",
        descricao: "Treinar cinco vezes por semana. Para os mini-monstros que não gostam de treinar no fim de semana."
    },
    {
        valor: "R$ 169,00",
        descricao: "Treinar todos os dias. Somente para os monstrão, #OgroMemo, #FicaGrande, #EsmagaQueCresce."
    }
];

Template.secaoPrecos.helpers({
    vetorPrecos: listaPrecos
});

// ########################## 
//Seção Marcas
// ##########################

var listaImagens = [{
        src: "optimumnutrition.png",
        alt: "Logo da marca Optimum Nutrition",
        title: "Optimum Nutrition",
        localTooltip: "top"
    },
    {
        src: "universal.png",
        alt: "Logo da marca Universal",
        title: "Universal",
        localTooltip: "left"
    },
    {
        src: "arnold.png",
        alt: "Logo da marca Arnold Schwarzenegger Series",
        title: "Arnold Schwarzenegger Series",
        localTooltip: "left"
    },
    {
        src: "animal.png",
        alt: "Logo da marca Animal",
        title: "Animal",
        localTooltip: "left"
    }
];

var listaImagens2 = [{
        src: "dymatize.png",
        alt: "Logo da marca Dymatize",
        title: "Dymatize",
        localTooltip: "top"
    },
    {
        src: "maxtitanium.png",
        alt: "Logo da marca Max Titanium",
        title: "Max Titanium",
        localTooltip: "left"
    },
    {
        src: "musclepharm.png",
        alt: "Logo da marca MusclePharm",
        title: "MusclePharm",
        localTooltip: "left"
    },
    {
        src: "4fuel.png",
        alt: "Logo da marca 4 Fuel",
        title: "4 Fuel",
        localTooltip: "left"
    }
];

Template.secaoMarcas.helpers({
    vetorImagens1: listaImagens,
    vetorImagens2: listaImagens2
});

// ########################## 
//Seção Contato
// ##########################

Template.modalSugestao.helpers({
    nomeUsuario: function() {
        if (Meteor.user().services.facebook) {
            return Meteor.user().services.facebook.name;
        } else {
            return "";
        }
    },
    emailUsuario: function() {
        if (Meteor.user().services.facebook) {
            return Meteor.user().services.facebook.email;
        } else {
            return "";
        }
    }
});

Template.modalSugestao.events({
    'click #btnEnviar': function(event) {
        var $btn = $("#btnEnviar").button('loading')
        if ($("#formSugestao").valid()) {
            Sugestoes.insert({ nome: $("#txtNome").val(), email: $("#txtEmail").val(), fone: $("#txtTelefone").val(), sugestao: $("#txtSugestao").val() });
            $("#alertSuccess").show();
            $("#txtNome").val("");
            $("#txtEmail").val("");
            $("#txtTelefone").val("");
            $("#txtSugestao").val("");
            $btn.button('reset');
        } else {
            $btn.button('reset');
            return false;
        }
    },
    'click #btnCancelar': function(event) {
        $("#txtNome").val("");
        $("#txtEmail").val("");
        $("#txtTelefone").val("");
        $("#txtSugestao").val("");
        $("#alertSuccess").hide();
        $("#modalSugestao").modal('hide');
    },
    'click #btnCloseAlertSuccess': function(event) {
        $("#alertSuccess").hide();
    }
});

Template.modalSugestao.onRendered(function() {
    $("#formSugestao").validate({
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
            error.insertAfter(element.parent());
        }
    });
});


/*
        var scrollToElement = function(el) {
            $('html,body').animate({
                scrollTop: $(el).offset().top - 70
            }, 1000);
        }
*/