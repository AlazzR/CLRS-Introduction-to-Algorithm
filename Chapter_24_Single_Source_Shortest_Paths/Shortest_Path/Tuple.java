package Java_Training.Shortest_Path;

public class Tuple {
    public Node node; 
    public int weight;

    Tuple(Node node, int weight){
        this.node = new Node(node);
        this.weight = weight;
    }
    
}
