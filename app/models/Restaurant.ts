export interface Restaurant {
    id: string;
    name: string;        
    address: string;      
    phones: string[];        
    description: string;  
    tags: string[];       
    rating: number;       
    location: {           
      latitude: number;
      longitude: number;
    };
  }