package Java_Training.Graph_Traversal;

import java.util.LinkedList;

public class Main{
    public static void main(String[] args){
        //My neighbors when I was young
        //connected 1
        Node me = new Node("Rashid", 26);
        Node dawah = new Node("Dawah", 36);
        Node mahir = new Node("Mahir", 30);
        Node abdo = new Node("Abdo", 32);
        //connected 2
        Node shibli = new Node("Shibli", 28);
        Node ahmadon = new Node("Ahmadon", 26);
        Node abdulrahman = new Node("Abdulrahman", 26);
        Node omar = new Node("Omar", 30);
        Node khalid = new Node("khalid", 26);
        //connected 3
        Node faisal = new Node("Faisal", 28);
        Node suliman = new Node("Suliman", 35);
        Node mazen = new Node("Mazen", 42);

        Graph g = new Graph(me);
        g.putNode(me, dawah);
        g.putNode(dawah, mahir);
        g.putNode(mahir, abdo);

        g.putNode(shibli, ahmadon);
        g.putNode(ahmadon, abdulrahman);
        g.putNode(abdulrahman, omar);
        g.putNode(omar, khalid);

        g.putNode(faisal, suliman);
        g.putNode(suliman, mazen);

        g.putNode(me, ahmadon);
        g.putNode(ahmadon, khalid);

        g.print();
        /********************************************************************************************************************/
        /*                                            BFS Simulation                                                        */
        /********************************************************************************************************************/

        //BFS.getShortestPath(g, me);
        {
            //Rashid -> khalid
            LinkedList<Node> path = BFS.getPath(g, me, khalid);
            if(path.size() == 0){
                System.out.println(me.print() + "isn't connected to " + khalid.print());
            }
            else{
                System.out.println("Path from " + me.print() + " to " + khalid.print());
                while(path.peek() != null){
                    Node tmp = path.pollFirst();
                    System.out.println(tmp.print());
    
                }
            }
        }

        {
            //Rashid -> mazen
            LinkedList<Node> path = BFS.getPath(g, me, mazen);
            if(path.size() == 0){
                System.out.println(me.print() + " isn't connected to " + mazen.print());
            }
            else{
                System.out.println("Path from " + me.print() + " to " + mazen.print());
                while(path.peek() != null){
                    Node tmp = path.pollFirst();
                    System.out.println(tmp.print());
    
                }
            }
        }
        /********************************************************************************************************************/
        /*                                            DFS Simulation                                                        */
        /********************************************************************************************************************/

        /* 
            // The apostrophe and dot indicate the arrow direction
            
                            5
                        /'      |.             
                    2
                /'
            1       |.      |'  6  )
                \.
                    3
                        \.      |'
                            4
        
        */
        Node.setCounter(1);
        Graph g2 = new Graph(null);
        Node n11 = new Node();
        Node n12 = new Node();
        Node n13 = new Node();
        Node n14 = new Node();
        Node n15 = new Node();
        Node n16 = new Node();

        g2.putNode(n11, n12);
        g2.putNode(n11, n13);
        g2.putNode(n12, n13);
        g2.putNode(n13, n14);
        g2.putNode(n14, n16);
        g2.putNode(n12, n15);
        g2.putNode(n15, n16);
        g2.putNode(n14, n15);
        g2.putNode(n16, n16);
        g2.print();
        DFS.DFSResults results_1 = DFS.dfs(g2);
        LinkedList<Node> _a = DFS.toplogical_sort(g2);
        DFS.isDAG(g2);

        //New example from MIT 6.006
        /*
            2
                \.
                    4                   9

                /'
            1   --. 5   --. 6   --. 7

                /'                /'
            3   --. 8  ----------
        */
        Node.setCounter(1);
        Graph g3 = new Graph(null);
        Node n21 = new Node();
        Node n22 = new Node();
        Node n23 = new Node();
        Node n24 = new Node();
        Node n25 = new Node();
        Node n26 = new Node();
        Node n27 = new Node();
        Node n28 = new Node();
        Node n29 = new Node();
        
        g3.putNode(n21, n24);
        g3.putNode(n21, n25);
        g3.putNode(n25, n26);
        g3.putNode(n26, n27);
        g3.putNode(n23, n25);
        g3.putNode(n23, n28);
        g3.putNode(n28, n27);
        g3.putNode(n23, n25);
        g3.putNode(n23, n28);
        g3.putNode(n22, n24);
        g3.putNode(n29, null);
        
        DFS.dfs(g3);
        DFS.toplogical_sort(g3);
        DFS.isDAG(g3);


    }
    
}
