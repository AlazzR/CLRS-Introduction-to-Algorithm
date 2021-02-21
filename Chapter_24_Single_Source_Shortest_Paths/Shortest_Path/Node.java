package Java_Training.Shortest_Path;

public class Node {
    //you need to ensure the uniquness of the id
    public final int id;
    public String streetName;
    public Node parent;

    Node(int id, String streetName){
        this.id = id;
        this.streetName = streetName;
        this.parent = null;
    }
    Node(Node node){
        this.id = node.id;
        this.streetName = node.streetName;
        this.parent = node.parent;
    }

    public String print(){
        return " id:" + this.id + " street name: " + this.streetName;
    }
}
