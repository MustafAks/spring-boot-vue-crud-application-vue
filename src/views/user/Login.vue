<template>
    <div class="container">
        <b-row>
            <b-col></b-col>
            <b-col cols="6">
                <b-form @submit="login" @reset="clear">
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
                    <b-row align-h="end">
                        <b-button type="submit" variant="primary">
                            Giriş Yap
                        </b-button>
                        <b-button type="reset" variant="danger" style="margin-left: 5px">Temizle</b-button>
                    </b-row>
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