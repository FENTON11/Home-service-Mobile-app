import { request, gql } from 'graphql-request'


const MASTER_URL="https://api-us-east-1-shared-usea1-02.hygraph.com/v2/clrz5hh951s7s01utnv7okrlj/master"
const getSlider=async()=>{
    const query = gql`
    query GetSlider {
        sliders {
          id
          name
          image {
            url
          }
        }
      }
  `
  const result=await request(MASTER_URL, query);
  return result ;
}
const getCategories=async()=>{
    const query=gql`
    query GetCategory {
        categories {
          id
          name
          icon {
            url
          }
        }
      }
    `
    const result=await request(MASTER_URL, query);
    return result ;
}
const getBusinessList= async()=>{
    const query=gql`
    query getBusinessList {
        businessLists {
            id
            name
            email
            contactPerson
            category {
              name
            }
            address
            about
            images {
              url
            }
          }
        }
    `
    const result=await request(MASTER_URL, query);
    return result ;
}
const getBusinessListByCategory=async(category)=>{
 const query=gql`
 query getBusinessList {
    businessLists(where: {category: {name: "`+category+`"}}) {
      id
      name
      email
      contactPerson
      address
      about
      images {
        url
      }
      category {
        name
      }
    }
  }
   `
 const result=await request(MASTER_URL, query);
    return result ;
}
const createBooking=async(data)=>{
  const mutationQuery=gql`
  mutation createBooking {
    createBooking(
      data: {
        bookingStatus: Booked
        businessList: { connect: 
        { id: "`+data.businessId+`" } }
        date: "`+data.date+`"
        time: "`+data.time+`"
        userEmail: "`+data.userEmail+`"
        userName: "`+data.userName+`"
      }
    ) {
      id
      date
      time
      businessList {
        id
        name
      }
      bookingStatus
    }
    publishManyBookings(to: PUBLISHED, where: { bookingStatus: Booked }) {
      count 
    }
  }
  
  `
  const result=await request(MASTER_URL, mutationQuery);
    return result ;
    
}

const getUserBookings=async(userEmail)=>{
  const query=gql`
  query GetUserBookings {
    bookings(orderBy: updatedAt_DESC,
     where: {userEmail: "`+userEmail+`"}) {
      time
      userEmail
      userName
      date
      bookingStatus
      id
      businessList {
        id
        images {
          url
        }
        name
        address
        contactPerson
        email
        about
      }
    }
  }
  `
  const result=await request(MASTER_URL, query);
    return result ;
}
const createCategory= async(data)=>{
const mutationQuery=gql`
createCategory(
  data: {
   id:"``"
   name:"``"
   
}) {
  id
  name
  icon {
    url
  }
}
publishManyCategories(to: PUBLISHED) {
  count
}
}
`
const result=await request(MASTER_URL, mutationQuery);
    return result ;
}
const deleteCategory= async()=>{
  const mutationQuery=gql`
  mutation createCategory {
    createCategory(data: {}) {
      id
      name
      icon {
        url
      }
    }
  }
  `
  const result=await request(MASTER_URL, mutationQuery);
    return result ;
}
const createBusinessList = async(businesss)=>{
  const mutationQuery=gql`
  mutation createBusinessList {
    createBusinessList(
      data: {
      name: "`+businesss.name+`", 
      email: "`+businesss.email+`",
      address: "`+ businesss.address+`", 
      about: "`+businesss.about+`", 
      contactPerson: "`+businesss.contact+`", 
      category: {create: {name: "`+businesss.category+`"}}, 
      images: {create: {fileName:"`+businesss.filename+`" , handle:"`+businesss.imagehandle+`"}}}
    ) {
      id
      name
      email
      address
      about
      category{
        name
      }
      contactPerson
      images {
        url
      }
    }
    publishManyBusinessLists(to: PUBLISHED) {
      count
    }
  }
   `
   const result=await request(MASTER_URL, mutationQuery);
   return result ; 
}
const  deleteBusinessList = async()=>{
  const mutationQuery=gql`
  mutation deleteBusinessList {
    deleteBusinessList(where: {id: ""}) {
      name
      email
      contactPerson
      address
      about
      id
    }
  }
  
  `
  const result=await request(MASTER_URL, mutationQuery);
   return result ;
} 
   const updateBusinessList = async()=>{
    const mutationQuery=gql`
    mutation updateBusinessList {
      updateBusinessList(
        data: {
          name: "", 
          contactPerson: "", 
          email: "", 
          address: "", 
          about: "", 
        category: {connect: {id: ""}}}
        where: {id: ""}
      ) {
        id
        name
        email
        contactPerson
        about
        address
        category {
          name
        }
        images {
          url
        }
      }
    }
     `
     const result=await request(MASTER_URL, mutationQuery);
     return result ;
   }
   const updateCategory = async()=>{
    const mutationQuery=gql`
    mutation updateCategory {
      updateCategory(data: 
        {name: ""}, 
        where: {id: ""}) {
        id
        name
        icon {
          url
        }
      }
    }
    `
    const result=await request(MASTER_URL, mutationQuery);
     return result ;
   }

export default{
    getSlider,
    getCategories,
    getBusinessList,
    getBusinessListByCategory,
    createBooking,
    getUserBookings,
    createCategory,
    deleteCategory,
    createBusinessList,
    deleteBusinessList,
    updateBusinessList,
    updateCategory

}
