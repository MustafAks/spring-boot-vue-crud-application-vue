<template>
    <div class="container">
        <div class="center">
            <b-container fluid>
                <b-row>
                    <b-col sm="4">
                        <label>Kullanıcı Adı:</label>
                    </b-col>
                    <b-col sm="7">
                        <b-form-input v-model="user.username"></b-form-input>
                    </b-col>
                </b-row>
                <b-row>
                    <b-col sm="4">
                        <label>Password:</label>
                    </b-col>
                    <b-col sm="7">
                        <b-form-input v-model="user.password"></b-form-input>
                    </b-col>
                </b-row>

                <b-container class="bv-example-row">
                    <b-row align-h="end">
                        <b-col cols="3">
                            <b-button type="submit" class="w-75" variant="primary" v-on:click.prevent="login">Giriş Yap
                            </b-button>
                        </b-col>
                    </b-row>
                </b-container>
            </b-container>
        </div>
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
                console.log(JSON.stringify(this.user));
                localStorage.setItem('user', JSON.stringify(this.user));
                console.log(localStorage.getItem('user'));


                const result = await UserService.login(this.user);
                if(result.authorities !== undefined){
                    this.user.role = result.authorities[0].authority;
                }
                localStorage.setItem('user', this.user);

                this.$router.push({name: 'latest'});
            }
        }
    };

</script>
