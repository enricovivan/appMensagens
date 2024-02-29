import { View, Text, Button } from "react-native";

export default function MessageList({navigation}){
    return (
        <View>
            <Text>Outra tela</Text>
            <Button title="Ir para Mensagens" onPress={()=>{navigation.navigate("Contato")}}/>
        </View>
    )
}