import React from 'react'
import { gql } from 'apollo-boost'
import { useQuery } from '@apollo/react-hooks';


const Home = () => {
  const { loading, error, data } = useQuery(GET_PRODUCTS);

  if (loading) return 'Loading...';
  if (error) return `Error! ${error.message}`;
  console.log("data", data)
  return (
    <div>
      <h1>Home</h1>
      {data.getProducts.map(product => {
        return <li key={product.id}>{product.name}</li>
      })
      }
    </div>
  )
}

const GET_PRODUCTS = gql`
{
        getProducts {
      id
      name
      description
      price
      image
    category {
        name
      }
      }
    }
    `;

export default Home
