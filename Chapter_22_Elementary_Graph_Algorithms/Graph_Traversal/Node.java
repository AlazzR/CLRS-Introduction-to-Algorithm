package Java_Training.Graph_Traversal;

public class Node {
    private final int id;
    private String name;
    private int age;
    private static int counter = 0;

    Node(){
        this.name = "";
        this.age = 0;
        this.id = counter; 
        counter++;
    }
    Node(String name, int age){
        this.name = name;
        this.age = age >=0? age: 0;
        this.id = counter;
        counter++;
    }
    String print(){
        return Integer.toString(this.id) + ":My name is: " + this.name + " and my age is: " + Integer.toString(this.age);
    }
    int getId(){
        return this.id;
    }

    public static void setCounter(Integer newCount){
        counter = newCount;
    }
    
}
