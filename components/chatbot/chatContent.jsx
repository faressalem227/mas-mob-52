import React, { useState } from 'react';
import { StyleSheet, View, TextInput, TouchableOpacity, Text, ScrollView } from 'react-native';

const ChatbotComponent = () => {
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([
        { type: 'user', text: 'can you help me?' },
        { type: 'bot', text: 'yes, I hope' },
    ]);

    const handleSendMessage = () => {
        if (message.trim() !== '') {
            setMessages([...messages, { type: 'user', text: message }]);
            setMessage('');
        }
    };

    return (
        <View style={styles.chatbot}>
            <View style={styles.section}>
                <ScrollView style={styles.chatbotContainer}>
                    {messages.map((msg, index) => (
                        <View
                            key={index}
                            style={[
                                styles.message,
                                msg.type === 'bot' ? styles.chatbotContainer.answer : styles.chatbotContainer.userChat,
                            ]}
                        >
                            
                            <Text style={styles.messageText}>{msg.text}</Text>
                        </View>
                    ))}
                </ScrollView>
                <View style={styles.index}>
                    <TextInput
                        style={styles.input}
                        value={message}
                        onChangeText={setMessage}
                        placeholder="write your message here"
                    />
                    <TouchableOpacity style={styles.button} onPress={handleSendMessage}>
                        <Text style={styles.buttonText}>Send</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    chatbot: {
        padding: 16,
        height: '80%',
        justifyContent: 'center',
    },
    section: {
        height: '90%',
    },
    chatbotContainer: {
        width: '85%',
        height: '70%',
        marginHorizontal: 'auto',
        backgroundSize: 'cover',
        borderRadius: 5,
        paddingVertical: 16,
        paddingHorizontal: 24,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        scrollbarWidth: 'thin',
    },
    message: {
        padding: 10,
        marginBottom: 10,
        display: 'flex',
        flexWrap: 'wrap',

    },
    messageText: {
        flex: 1, 
        flexWrap: 'wrap',
        position:"relative",
        maxWidth:"100%",

    },
    chatbotContainer: {
        answer: {
            backgroundColor: '#E3F2FF',
            borderRadius: 10,
            borderBottomRightRadius:0,
            maxWidth:"70%",
            marginLeft: 'auto',
            flexWrap: 'wrap',

        },
        userChat: {
            marginRight: 'auto',
            borderRadius: 10,
            borderBottomLeftRadius:0,
            maxWidth:"70%",
            backgroundColor: '#F6F6F6',
            flexWrap: 'wrap',

        },
    },
    index: {
        width: '85%',
        marginVertical: 8,
        flexDirection: 'row',
        justifyContent: 'center',

    },
    input: {
        width: '85%',
        minHeight: '2.5rem',
        borderRadius: 5,
        borderColor: '#0e3fa6',
        backgroundColor: '#E1E8ED',
        outlineColor: '#0e3fa6',
        paddingHorizontal: 8,

    },
    button: {
        width: '15%',
        minWidth: '7rem',
        minHeight: '2.5rem',
        maxHeight: '3rem',
        borderRadius: 5,
        borderWidth: 1,
        borderColor: 'rgb(4, 90, 250)',
        backgroundColor: 'linear-gradient(to right, rgb(4, 90, 250), #8abceb, rgb(4, 90, 250))',
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonText: {
        fontWeight: '700',
        color: '#fff',
    },
});

export default ChatbotComponent;