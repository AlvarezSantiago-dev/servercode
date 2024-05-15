const template = (data) => `
<div class="d-flex flex-row justify-content-lg-between flex-wrap">

    <div class="card p-4 flex-fill m-3" style="width: 20rem;">
        <img src="${data.photo}" class="card-img-top" alt="Product Image">
        <div class="card-body bg-secondary">
            <h5 class="card-title" style="width: 16rem;">${data.tittle}</h5>
            <div class="card d-flex ">
                <a href="/products/${data._id}" class="btn btn-danger">Detalles</a>
            </div>
            
        </div>
    </div>


</div>
<div class="d-flex justify-content-center">
    <a href="/" class="btn btn-danger p-3 mb-3">Volver</a>
</div>
`
fetch("api/products/paginate")
.then((res) => res.json())
.then((res)=> {
    console.log(res);
})
async function addToCart(pid) {
    try {
        const data = {
            user_id: "232",
            product_id: pid,
            quantinty: 1
        }
        const url = "api/products"
        const opts = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json'}

        }
        let response = await fetch(url,opts)
        response = await response.json()
        console.log(response);
    } catch (error) {
        
    }
}