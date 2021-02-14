/* eslint-disable camelcase */
import React from 'react'
import {Card, Image} from 'semantic-ui-react'
import {Link} from 'gatsby'

const mapProductsToItems = products =>
  products.map(({node: {name, id, meta, mainImageHref}}) => {
    const price = meta.display_price.with_tax.formatted || null
    return {
      as: Link,
      to: `/product/${id}/`,
      childKey: id,
      image: (
        <Image>
          <img src={mainImageHref} alt={`product-${id}`} />
        </Image>
      ),
      header: name,
      meta: <Card.Meta style={{color: 'dimgray'}}>{price}</Card.Meta>,
    }
  })

export default ({products}) => (
  <Card.Group items={mapProductsToItems(products)} itemsPerRow={2} stackable />
)
