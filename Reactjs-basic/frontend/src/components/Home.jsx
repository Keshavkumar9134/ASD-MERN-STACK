import React from 'react'

const Home = () => {
const products = [
            {id:1, name:"react", price:4500},
        {id:2, name:"Nodejs", price:3500},
        {id:3, name:"Nextjs", price:1500},
        {id:4, name:"java", price:6500},

]

  return (
    <div style={{marginTop:"60px"}} >
        <p>Home Page</p>
        <table border={2} width="100%">
            <tr>
                <th>ID</th>
                <th>NAME</th>
                <th>PRICE</th>
            </tr>
            {
                products.map(x=>(
                    <tr>
                        <td>{x.id}</td>
                        <td>{x.name}</td>
                        <td>{x.price}</td>
                    </tr>
                ))
            }
        </table>
    </div>
  )
}

export default Home