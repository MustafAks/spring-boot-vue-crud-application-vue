<template>
    <div class="container">
        <b-row>
            <h3>Mesajlar</h3>
            <b-button variant="danger" v-on:click.prevent="deleteMessages()" style="margin: 3px 0 20px 30px" size="sm">
                <b-icon icon="trash-fill"></b-icon> Tümünü Sil
            </b-button>
            <div class="separator" style="margin-bottom: 50px"></div>
        </b-row>
        <b-row>
            <b-table class="table table-bordered" responsive striped :fields="messagesFields" :items="messages">
                <template v-slot:cell(operations)="row">
                    <b-row>
                        <b-button variant="danger" v-on:click.prevent="deleteMessage(row.item.id)">
                            <b-icon icon="trash-fill"></b-icon> Sil
                        </b-button>
                    </b-row>
                </template>
            </b-table>
        </b-row>
    </div>
</template>

<script>
    import MessageService from '../service/MessageService';

    export default {
        name: 'messages',
        data() {
            return {
                messages: [],
                messagesFields: [
                    { key: 'name', label: 'Adı Soyadı'},
                    { key: 'phone', label: 'Telefon'},
                    { key: 'emailAddress', label: 'Email Adres'},
                    { key: 'message', label: 'Mesaj'},
                    { key: 'operations', label: 'İşlemler'}
                ],
            };
        },
        methods: {
            async listMessages() {
                this.messages = await MessageService.listMessages();
            },

            async deleteMessage(id) {
                await MessageService.deleteMessage(id);
                this.$notification(this, 'Mesaj başarılı bir şekilde silindi.');
                this.listMessages();
            },

            async deleteMessages() {
                await MessageService.deleteAll();
                this.$notification(this, 'Mesajların hepsi başarılı bir şekilde silindi.');
                this.listMessages();
            }
        },
        beforeMount() {
            this.listMessages();
        }
    };

</script>
<style>
</style>
