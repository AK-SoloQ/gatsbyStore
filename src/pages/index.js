import React from 'react'
import {graphql, useStaticQuery} from 'gatsby'
import get from 'lodash/get'
import {Header} from 'semantic-ui-react'
import ProductList from '../components/ProductList'
import SEO from '../components/SEO'
import Layout from '../components/Layout'

const StoreIndex = ({location}) => {
  const data = useStaticQuery(graphql`
    query IndexQuery {
      site {
        siteMetadata {
          title
        }
      }
      allMoltinProduct {
        edges {
          node {
            id
            name
            description
            mainImageHref
            meta {
              display_price {
                with_tax {
                  amount
                  currency
                  formatted
                }
              }
            }
            mainImage {
              childImageSharp {
                sizes(maxWidth: 600) {
                  ...GatsbyImageSharpSizes
                }
              }
            }
          }
        }
      }
    }
  `)

  const siteTitle = get(data, 'site.siteMetadata.title')
  const products = get(data, 'allMoltinProduct.edges')
  let filterProductsWithoutImages = products.filter(v => v.node.mainImageHref)
  filterProductsWithoutImages = filterProductsWithoutImages.map(product => {
    const updatedProduct = {...product}
    updatedProduct.node.mainImageHref =
      'https://cdn.liberte-algerie.com/images/article/thumbs/d-les-fabricants-de-brique-rouge-suffoquent-0fada.jpg'
    updatedProduct.node.name = 'BRIQUE A12'
    updatedProduct.node.meta.display_price.with_tax = {
      amount: 850,
      currency: 'TND',
      formatted: '850.000 mille pièces',
    }
    console.log('--->', {updatedProduct})
    return updatedProduct
  })
  return (
    <Layout location={location}>
      <SEO title={siteTitle} />
      <Header
        as="h3"
        icon
        textAlign="center"
        style={{
          marginBottom: '2em',
        }}
      >
        <Header.Content
          style={{
            width: '60%',
            margin: '0 auto',
          }}
        />
      </Header>
      <ProductList products={filterProductsWithoutImages} />
    </Layout>
  )
}

export default StoreIndex
