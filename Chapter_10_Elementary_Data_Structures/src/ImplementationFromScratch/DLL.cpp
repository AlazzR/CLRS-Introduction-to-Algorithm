#include "DLL.hpp"

void DLL::addTohead(int id)
{
    if(head == NULL)
    {
        //Empty list
        head = new NodeDLL(id, head, head);//Prev and next are null
        tail = head;
    }
    else   
    {
        //Still at the beginning of the list
        NodeDLL* tmp = new NodeDLL(id);
        head->prev = tmp;
        tmp->next = head;
        head = tmp;
    }
}

void DLL::addToTail(int id)
{
    if(tail == NULL || head == NULL)
    {
        head = new NodeDLL(id, head, head);
        tail = head;
    }
    else
    {
        NodeDLL* tmp = new NodeDLL(id, NULL, tail);
        tail->next = tmp;//update the previous tail 
        tail = tmp;

    }
}
NodeDLL* DLL::findNode(int id) const
{
    NodeDLL* node;
    for(node=head; node !=NULL && node->id != id; node=node->next);
    if(!(node == NULL))
        return node;
    return NULL;
}

void DLL::deleteFromHead()
{
    if(head == NULL)
    {}
    else if(head == tail)
    {
        delete head;
        head = tail =0;
    }
    else
    {
        NodeDLL* tmp=head;
        head = head->next;
        head->prev = NULL;
        delete tmp;
    }
}

void DLL::deleteFromTail()
{
    if(head == NULL)
    {}
    else if(head == tail)
    {
        delete head;
        head = tail =0;
    }
    else
    {
        NodeDLL* tmp=tail;
        tail->prev->next = NULL;
        tail = tail->prev;
        delete tmp;
    }
}

void DLL::deleteById(int id)
{
    if(head == NULL)
    {
    }
    else if(head == tail && head->id == id)
    {
        delete head;
        head = tail = 0;
    }
    else
    {
        NodeDLL* node;
        for(node=head; node != NULL && !(node->id == id); node=node->next);
        if(node != NULL)
        {
            std::cout << "Deleting Node: " << node->id << std::endl;
            if(node == head)
            {
                node->next->prev = 0;
                head = node->next;
            }
            else if (node == tail)
            {
                node->prev->next = 0;
                tail = node->prev;
            }
            else
            {
                node->prev->next = node->next;
                node->next->prev = node->prev;
            }

            delete node;
        }
    }
    

}

void DLL::printContent() const
{
    NodeDLL* tmp = head;
    while(tmp != NULL)
    {
        std::cout << "Node id: " << tmp->id << std::endl;
        tmp = tmp->next;
    }
}