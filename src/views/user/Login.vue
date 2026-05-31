<template>
    <div class="container">
        <b-row>
            <b-col></b-col>
            <b-col cols="6">
                <b-form @submit="login" @reset="clear" onsubmit="return false;">
                    <h2>Giriş Yap</h2>
                    <div class="separator"></div>
                    <b-form-group
                            id="input-group-1"
                            label-cols-sm="4"
                            label-cols-lg="3"
                            label="Kullanıcı Adı"
                            label-for="username"
                    >
                        <b-form-input
                                id="username"
                                v-model="user.username"
                                required
                        ></b-form-input>
                    </b-form-group>
                    <b-form-group
                            id="input-group-2"
                            label-cols-sm="4"
                            label-cols-lg="3"
                            label="Şifre"
                            label-for="password"
                    >
                        <b-form-input
                                id="password"
                                type="password"
                                v-model="user.password"
                                required
                        ></b-form-input>
                    </b-form-group>
                    <div class="d-flex justify-content-end">
                        <b-button type="submit" variant="primary" class="text-white">
                            Giriş Yap
                        </b-button>
                        <b-button type="reset" variant="danger" class="ml-1 text-white">Temizle</b-button>
                    </div>
                </b-form>
            </b-col>
            <b-col></b-col>
        </b-row>

    </div>
</template>

<script>
    import UserService from "../../service/UserService";

    export default {
        name: "login",
        data() {
            return {
                user: {
                    username: '',
                    password: ''
                }
            };
        },
        methods: {
            async login() {
                localStorage.setItem('user', JSON.stringify(this.user));
                //TODO exceptionları düzeltince loginde hata alınırsa localstorage dan user silinecek.
                const result = await UserService.login(this.user);
                if (result.authorities !== undefined) {
                    this.user.role = result.authorities[0].authority;
                    this.$store.commit('setUserRole', result.authorities[0].authority);
                }
                this.$store.commit('setUsername', result.username);
                localStorage.setItem('user', JSON.stringify(this.user));
                this.$router.push({name: 'mainPage'});
            },

            clear() {
                // Reset our form values
                this.user.username = '';
                this.user.password = '';
            }
        }
    };

</script>
<style>
    .separator {
        border-bottom: solid 1px #ccc;
        margin-bottom: 15px;
    }
</style>