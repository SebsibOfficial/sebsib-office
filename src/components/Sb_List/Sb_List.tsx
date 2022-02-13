import './Sb_List.css';
import Sb_List_Item, {Props as Sb_List_Item_Props, actionType, compType} from '../Sb_List_Item/Sb_List_Item';

export type item = { id:string, text:string, defaultSelectValue?:"UNSELECTED" | "SELECTED"};

interface Props {
    items: item[],
    listType: "MEMBER" | "PROJECT",
    compType: compType;
    onAction: (id:string, actionType:actionType) => void
}

export default function Sb_List (props:Props) {
    return (
        <div>
            {
                props.items.map((item:item) => (
                    <Sb_List_Item key={item.id} id={item.id} compType={props.compType} 
                    type={props.listType} text={item.text} 
                    defaultSelectValue={item.defaultSelectValue}
                    onAction={(id:string, actionType:actionType) => props.onAction(id, actionType)}
                    />
                ))
            }
        </div>
    )
}