import { useState } from 'react';
import ProductForm from '../../component/product/productForm/ProductForm';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  createProduct,
  selectIsLoading,
} from '../../redux/features/product/productSlice';
import Loader from '../../component/loader/Loader';

const initialState = {
  name: '',
  category: '',
  quantity: '',
  price: '',
};
const AddProduct = () => {
  const [product, setProduct] = useState(initialState);
  const [productImage, setProductImage] = useState('');
  const [imagePreview, setImagePreview] = useState(null);
  const [description, setDescription] = useState('');

  const isLoading = useSelector(selectIsLoading);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { name, category, price, quantity } = product;

  // Handle Input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setProduct({ ...product, [name]: value });
  };

  // Handle  image change
  const handleImageChange = (e) => {
    setProductImage(e.target.files[0]);
    setImagePreview(URL.createObjectURL(e.target.files[0]));
  };

  // Generate SKU
  const generateSKU = (category) => {
    const letter = category.slice(0, 3).toUpperCase();
    const number = Date.now();
    const sku = letter + '-' + number;

    return sku;
  };

  // Save product
  const saveProduct = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('name', name);
    formData.append('sku', generateSKU(category));
    formData.append('category', category);
    formData.append('price', price);
    formData.append('quantity', quantity);
    formData.append('description', description);
    formData.append('image', productImage);

    console.log(...formData);

    await dispatch(createProduct(formData));

    navigate('/dashboard');
  };

  return (
    <div>
      {isLoading && <Loader />}
      <h3 className="--mt">Add New Product</h3>
      <ProductForm
        product={product}
        productImage={productImage}
        imagePreview={imagePreview}
        description={description}
        setDescription={setDescription}
        handleInputChange={handleInputChange}
        handleImageChange={handleImageChange}
        saveProduct={saveProduct}
      />
    </div>
  );
};

export default AddProduct;
