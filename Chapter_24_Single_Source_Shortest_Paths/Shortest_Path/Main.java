package Java_Training.Shortest_Path;

import java.util.Vector;

public class Main {
    
    public static void main(String[] args){
        //nodes used, and the edge weights can be seen from the image
        Node n1 = new Node(1, "St 1");
        Node n2 = new Node(2, "St 2");
        Node n3 = new Node(3, "St 3");
        Node n4 = new Node(4, "St 4");
        Node n5 = new Node(5, "St 5");
        Node n6 = new Node(6, "St 6");
        Node n7 = new Node(7, "St 7");
        /*****************************************************************************
        *                      Binary Minimum Heap                                   *
        ******************************************************************************/
        Vector<Tuple> tmpNodes = new Vector<Tuple>();
        tmpNodes.add(new Tuple(n1, -10));
        tmpNodes.add(new Tuple(n1, 1));
        tmpNodes.add(new Tuple(n1, 2));
        tmpNodes.add(new Tuple(n2, 10));
        tmpNodes.add(new Tuple(n2, 3));
        tmpNodes.add(new Tuple(n5, 6));
        tmpNodes.add(new Tuple(n7, 1));
        tmpNodes.add(new Tuple(n4, 2));
        tmpNodes.add(new Tuple(n4, 8));
        tmpNodes.add(new Tuple(n4, 4));
        tmpNodes.add(new Tuple(n4, 2));
        tmpNodes.add(new Tuple(n6, 30));//not in the graph
        tmpNodes.add(new Tuple(n3, 4));
        tmpNodes.add(new Tuple(n3, 5));

        PriorityQ tmpQ = new PriorityQ(tmpNodes);

        System.out.println(tmpQ.removeTopPriority().node.id + ":" + tmpQ.removeTopPriority().weight);
        System.out.println("---------------------------------------------------------------");
        tmpQ.print_min_heapify();
        System.out.println("---------------------------------------------------------------");
        /*****************************************************************************
        *                      Dijkstra's Algorithm                                   *
        ******************************************************************************/
        Graph g = new Graph();
        g.insertNodeWithAdj(n1, n4, 1);
        g.insertNodeWithAdj(n1, n2, 2);
        g.insertNodeWithAdj(n2, n5, 10);
        g.insertNodeWithAdj(n2, n4, 3);
        g.insertNodeWithAdj(n4, n5, 2);
        g.insertNodeWithAdj(n4, n3, 2);
        g.insertNodeWithAdj(n4, n7, 4);
        g.insertNodeWithAdj(n4, n6, 8);
        g.insertNodeWithAdj(n5, n7, 6);
        g.insertNodeWithAdj(n7, n6, 1);
        g.insertNodeWithAdj(n3, n1, 4);
        g.insertNodeWithAdj(n3, n6, 5);
        g.print_graph();
        System.out.println("---------------------------------------------------------------");
        Dijkstra_algorithm.dijkstra(g, n1, n6);
        
        
    }
    
}
