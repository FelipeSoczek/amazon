<template>
    <main>
        <div class="container-fluid">
            <div class="row">
                <div class="col-sm-3"></div>
                <div class="col-sm-6">
                    <div class="a-section">
                        <div class="a-spacing-top-medium"></div>
                        <h2 style="text-align: center">Adicionar novo produto</h2>
                        <form>
                            <div class="a-spacing-top-medium">
                                <label>Categoria</label>
                                <select class="a-select-option" v-model="categoryID">
                                    <option 
                                        v-for="category in categories" 
                                        :value="category._id" 
                                        :key="category._id"
                                    >
                                        {{ category.type }}
                                    </option>
                                </select>
                            </div>

                            <div class="a-spacing-top-medium">
                                <label>Proprietário</label>
                                <select class="a-select-option" v-model="ownerID">
                                    <option 
                                        v-for="owner in owners" 
                                        :value="owner._id" 
                                        :key="owner._id"
                                    >
                                        {{ owner.name }}
                                    </option>
                                </select>
                            </div>

                            <div class="a-spacing-top-medium">
                                <label style="margin-bottom: 0px">Título</label>
                                <input type="text" class="a-input-text" style="width: 100%" v-model="title">
                            </div>

                            <div class="a-spacing-top-medium">
                                <label style="margin-bottom: 0px">Preço</label>
                                <input type="number" class="a-input-text" style="width: 100%" v-model="price">
                            </div>

                            <div class="a-spacing-top-medium">
                                <label style="margin-bottom: 0px">Quantidade no estoque</label>
                                <input type="number" class="a-input-text" style="width: 100%" v-model="stockQuantity">
                            </div>

                            <div class="a-spacing-top-medium">
                                <label style="margin-bottom: 0px">Descrição</label>
                                <textarea placeholder="Detalhes" style="width: 100%" v-model="description"></textarea>
                            </div>

                            <div class="a-spacing-top-medium">
                                <label style="margin-bottom: 0px">Imagem</label>
                                <div class="a-row a-spacing-medium">
                                    <label class="choosefile-button">
                                        <i class="fal fa-plus"></i>
                                        <input type="file" @change="onFileSelected">
                                        <p style="margin-top: -70px">{{ fileName }}</p>
                                    </label>
                                </div>
                            </div>

                            <hr />

                            <div class="a-spacing-top-large">
                                <span class="a-button-register">
                                    <span class="a-button-inner">
                                        <span class="a-button-text" @click="onAddProduct">
                                            Adicionar produto
                                        </span>
                                    </span>
                                </span>
                            </div>
                        </form>
                    </div>
                </div>
                <div class="col-sm-3"></div>
            </div>
        </div>
    </main>
</template>

<script>
export default {
    async asyncData({ $axios }) {
        try {
            let categories = $axios.$get('http://localhost:3000/api/categories')
            let owners = $axios.$get('http://localhost:3000/api/owners')

            const [catResponse, ownerResponse] = await Promise.all([
                categories,
                owners
            ])

            return {
                categories: catResponse.categories,
                owners: ownerResponse.owners
            }
        } catch (error) {
            console.log(error)
        }
    },

    data () {
        return {
            categoryID: null,
            ownerID: null,
            title: '',
            price: 0,
            description: '',
            selectedFile: null,
            fileName: '',
            stockQuantity: 1
        }
    },
    methods: {
        onFileSelected(event) {
            this.selectedFile = event.target.files[0]
            console.log(this.selectedFile)
            this.fileName = event.target.files[0].name
        },

        async onAddProduct() {
            let data = new FormData()
            data.append('title', this.title)
            data.append('price', this.price)
            data.append('description', this.description)
            data.append('ownerID', this.ownerID)
            data.append('stockQuantity', this.stockQuantity)
            data.append('categoryID', this.categoryID)
            data.append('image', this.selectedFile, this.selectedFile.name)

            let result = await this.$axios.$post('http://localhost:3000/api/products', data)

            this.$router.push("/")
        }
    }
}
</script>