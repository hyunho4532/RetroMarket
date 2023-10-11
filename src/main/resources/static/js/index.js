new Vue({
    el: '#app',
    data: {
        productModalVisible: false,
        addressDialogVisible: false,
        selectedImage: '',
        title: '',
        content: '',
        addressInput: '',
        addresses: [],
    },

    methods: {
        showProductModal() {
            this.productModalVisible = true;
        },

        closeProductModal() {
            this.productModalVisible = false;
        },

        handleImageChange(event) {
            const file = event.target.files[0];

            if (file) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    this.selectedImage = e.target.result;
                };

                reader.readAsDataURL(file);
            }
        },

        showAddressDialog() {
            this.addressDialogVisible = true;
        },

        searchAddress() {
            // Implement your address search logic here
        },

        setSelectedAddress(address) {
            this.selectedAddress = address;
            this.addressDialogVisible = false;
        },
    }
});