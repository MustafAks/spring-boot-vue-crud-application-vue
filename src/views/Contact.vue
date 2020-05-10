<template>
  <div class="container">
    <div id="contact-form" class="contact-form">
      <b-row>
        <b-col class="col-6">
          <h1 class="contact-form_title">Hasret Gazetesi</h1>
          <div class="separator"></div>

          <label>Aylık Süreli Yayın</label><br>
          <label>Gazetemiz Basın Meslek İlkelerine uymaya söz vermiştir.</label><br>
          <label>Yazarlarımızın sorumluluğu kendilerine aittir.</label>

          <h1 class="contact-form_title">İmtiyaz Sahibi ve Genel Yayın Yönetmeni</h1>
          <div class="separator"></div>
          <label> {{ parameters.licensee }}</label>

          <h1 class="contact-form_title">Sorumlu Yazı İşleri Müdürü</h1>
          <div class="separator"></div>
          <label> {{ parameters.boss }}</label>

          <h1 class="contact-form_title">İrtibat Telefonu</h1>
          <div class="separator"></div>
          <label> {{ parameters.contactNumber }}</label>

          <h1 class="contact-form_title">E-mail</h1>
          <div class="separator"></div>
          <label> {{ parameters.emailAddress }}</label>
        </b-col>

        <b-col class="col-6">
          <h1 class="contact-form_title">İletişim Formu</h1>
          <div class="separator"></div>

          <form class="form" @submit="saveMessage" onsubmit="return false;">
            <input required v-model='messages.name' placeholder="Ad Soyad" type="text" autocomplete="off">
            <input required v-model='messages.phone' placeholder="Telefon" type="text" autocomplete="off">
            <input v-model="messages.emailAddress" placeholder="E-mail" type="email" autocomplete="off">
            <textarea required v-model="messages.message" v-on:keyup="textCounter()" rows="4" placeholder="Mesaj" maxlength="1000"></textarea>
            <input style="margin-bottom: 10px; text-align: right;" disabled v-model="counter">
            <button class="button">Gönder</button>
          </form>
        </b-col>
      </b-row>
    </div>
  </div>
</template>

<script>
  import ParameterService from "../service/ParameterService";
  import MessageService from "../service/MessageService";

  export default {
    name: "contact",
    data() {
      return {
        parameters: {
          licensee: null,
          boss: null,
          contactNumber: null,
          emailAddress: null,
          facebookLink: null,
          twitterLink: null,
          instagramLink: null
        },
        messages: {
          name: null,
          phone: null,
          emailAddress: null,
          message: null
        },
        counter : "0 / 1000"
      };
    },
    methods: {
      async getParameters() {
        this.parameters = await ParameterService.getParameters();
      },

      async saveMessage() {
        if (this.messages.name === undefined || this.messages.name === null || this.messages.name === '') {
          this.$errorNotification(this, 'Lütfen ad ve soyad giriniz !');
          return;
        }
        if (this.messages.phone === undefined || this.messages.phone === null || this.messages.phone === '') {
          this.$errorNotification(this, 'Lütfen telefon bilgisi giriniz !');
          return;
        }
        if (this.messages.message === undefined || this.messages.message === null || this.messages.message === '') {
          this.$errorNotification(this, 'Lütfen mesajınızı giriniz !');
          return;
        }

        await MessageService.saveMessage(this.messages);
        this.$notification(this, 'Mesajınız iletildi. En yakın zamanda incelenecektir.');
        this.clearForm();
      },

      async clearForm() {
        for (let field in this.messages) {
          this.messages[field] = ''
        }
      },

      textCounter() {
        this.counter = this.messages.message.length + " / 1000";
      }
    },

    beforeMount() {
      this.getParameters();
    }
  };
</script>
<style>
  body {
    /*background: #f1f1f1;*/
    font-family: 'Roboto', sans-serif;
  }

  .contact-form {
    /*font-family: 16px;*/
    margin: 0 auto;
    width: 100%;
  }

  .contact-form .separator {
    border-bottom: solid 1px #ccc;
    margin-bottom: 15px;
  }

  .contact-form .form {
    display: flex;
    flex-direction: column;
    font-size: 16px;
  }

  .contact-form_title {
    color: #333;
    text-align: left;
    font-size: 28px;
    margin-top: 10px;
  }

  .contact-form input[type="email"],
  .contact-form input[type="text"],
  .contact-form textarea {
    border: solid 1px #e8e8e8;
    font-family: 'Roboto', sans-serif;
    padding: 10px 7px;
    margin-bottom: 15px;
    outline: none;
  }

  .contact-form textarea {
    resize: none;
  }

  .contact-form .button {
    background: #da552f;
    border: solid 1px #da552f;
    color: white;
    cursor: pointer;
    padding: 10px 50px;
    text-align: center;
    text-transform: uppercase;
  }

  .contact-form .button:hover {
    background: #ea532a;
    border: solid 1px #ea532a;
  }

  .contact-form input[type="email"],
  .contact-form input[type="text"],
  .contact-form textarea,
  .contact-form .button {
    font-size: 15px;
    border-radius: 3px
  }
</style>
