
tower block maquette

determiner 3 axes x;y;z (haut;larg;prof) ( 3d ) ou 2 axes(larg;haut) ( 2d )

determiner placement premiere slice + proprietes

trigger : bouton start ( event listener click ) 
    loop : le jeu commence ,
                 *disparition du bouton start ,
                 *apparition du score , 
            loop :     *la premiere couche(slice) part toujours du meme axe
                 et va et viens sur celui ci en depassant la slice initiale de distances egales a chaque aller retour

        event click : break ;  * arret defilement de la slice + calcul position par rapport a la slice precedente
                    *nouvelle loop avec nouvelle slice pour position precedente+1
                    *nouvelle slice apparrait sur laxe suivant (ou diff) avec proprietes etablis suivant le calcul precedent
        event click : break ;  * arret defilement de la slice + calcul position par rapport a la slice precedente
                    *nouvelle loop avec nouvelle slice
                    *nouvelle slice apparrait sur laxe suivant (ou diff) avec proprietes etablis suivant le calcul precedent

        etc :        :      :

//penser au defilement de l'ecran au fur et a mesure que la tour monte
propriete , nouvelle slice toujours centrée a l'ecran


        si ; taille nouvelle slice = 0 : break : break 

        si score = top 10 = prompt ( demander namejoueur ) return to high scores

        affichage score ; bouton start + event listener pour recomencer la boucle et le jeu