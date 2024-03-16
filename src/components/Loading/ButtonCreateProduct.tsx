import { Button, Modal } from "flowbite-react";
import { useState } from "react";
import FromCreateProduct, { AddProduct } from "./FromCreateProduct";

const ButtonCreateProductComponent = () => {
  const [openModal, setOpenModal] = useState(false);
  const [productData, setProductData] = useState<AddProduct | null>(null);

  function getDataFrom(product: AddProduct) {
    console.log(product);
    setProductData(product);
  }
  async function createProduct() {
    setOpenModal(true);
    try {
      const postProduct = await fetch("https://fakestoreapi.com/products", {
        method: "POST",
        body: JSON.stringify({
          getDataFrom,
        }),
      });
      const res = await postProduct.json();
      console.log(res);
    } catch (err) {
      console.log(err);
    } finally {
      setOpenModal(false);
    }
  }

  return (
    <>
      <div className="flex justify-center m-5 w-full">
        <Button onClick={() => setOpenModal(true)} color="blue">
          Create Products
        </Button>
      </div>
      <Modal show={openModal} onClose={() => setOpenModal(false)}>
        <Modal.Header>Create new Product</Modal.Header>
        <Modal.Body>
          <div className="space-y-6">
            <FromCreateProduct getDataFrom={getDataFrom} />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={createProduct}>Create</Button>
          <Button color="gray" onClick={() => setOpenModal(false)}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ButtonCreateProductComponent;
