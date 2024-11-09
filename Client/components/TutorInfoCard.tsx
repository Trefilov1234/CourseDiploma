import photo from "../public/Images/noImage.png"
import ImageHtml from "next/image";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import 'bootstrap/dist/css/bootstrap.min.css';
import { redirect } from 'next/navigation'

export default function TutorInfo({subject,description,image,firstname,lastname,tutInfId}){


    return (
    <Card style={{ width: '18rem' }}>
        {image.data?<Card.Img src={"data:image/jpg;base64,"+image.data} alt="../" width={200} height={300}/>:
            <Card.Img src={photo.src} alt="../" width={200} height={300}/>}
      <Card.Body>
        <Card.Title>{subject}</Card.Title>
        <Card.Text>
          {firstname+" "+ lastname}
        </Card.Text>
        <Button variant="primary" href={`/tutorPageDetails/${tutInfId}`}>Go somewhere</Button>
      </Card.Body>
    </Card>     
    )
}