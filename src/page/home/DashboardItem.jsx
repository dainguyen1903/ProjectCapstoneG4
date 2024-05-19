import { Card } from "antd";

const DashBoardItem = ({title,content,color,icon}) => {
return <Card style={{
    borderLeft:`5px solid ${color}`,
    position:"relative"
}}>
    <p style={{
        fontWeight:"bold",
        fontSize:16,
        position:"absolute",
        top:-10,
        left:10
    }}>{title}</p>
    <div style={{
        color,
        fontSize:28,
        display:"flex",
        justifyContent:"center",
        alignItems:'center',
        fontWeight:"bold",
        padding:"15px 0"
    }}>
        {content}
    </div>
</Card>
}
export default DashBoardItem;