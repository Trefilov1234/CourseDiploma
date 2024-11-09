import ClientComponent from './clientComponent'
export default async function Page({params}) { 
    const { id } = await params;
    return <ClientComponent id={id}/>
}