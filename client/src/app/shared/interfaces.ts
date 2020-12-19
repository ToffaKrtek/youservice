export interface User {
    tel: string,
    password: string,
    role: number,
    card_id: string,
    login: string
}

export interface Order {
    _id?: string,
    user_id: string, 
    way_start: {
        type: {
            type: String,
            enum: ['Point'],
            required: true
          },
          coordinates: {
              type: [Number],
              required: true
          }  
        },
    way_end: {
        type: {
            type: string,
            enum: ['Point'],
          },
          coordinates: {
              type: [number]
          }  
        }, 
    time_created: Date,
    comments?: string,
    confirm: boolean,
    active: boolean, 
    price: number,
    driver_id?: string
}
