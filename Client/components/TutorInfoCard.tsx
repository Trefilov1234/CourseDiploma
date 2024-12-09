import photo from "../public/Images/noImage.png"
import ImageHtml from "next/image";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import 'bootstrap/dist/css/bootstrap.min.css';
import { redirect } from 'next/navigation'
import Image from 'react-bootstrap/Image';
export default function TutorInfo({subject,image,firstname,lastname,tutInfId}){


    return (
    <Card style={{ width: '18rem',zIndex:'1' }}>
        {image?<Card.Img src={"data:image/jpg;base64,"+image} alt="../" width={300} height={200} style={{   objectFit: "cover"}}/>:
            <Card.Img src={photo.src} alt="../" width={300} height={200} style={{   objectFit: "cover"}} />}
      <Card.Body>
        <Card.Title>{subject}</Card.Title>
        <Card.Text>
          {firstname+" "+ lastname}
        </Card.Text>
        <Button variant="primary" href={`/tutorPageDetails/${tutInfId}`}>Details</Button>
        
      </Card.Body>
    </Card>     
    )
}