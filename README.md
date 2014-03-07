Canvasloth
==========

Canvasloth est un framework (encore en cours de développement) qui permet de créer facilement des mini-jeux ou tout autres type d'application en 2 ou 3 dimensions.

Pour le moment, voici le seul projet fait avec Canvasloth: **[KillDemAll](http://mr21.fr/KillDemAll/)**.

De nos jours, utiliser le *context 2D* de la balise `<canvas>` en
HTML5 est très simple. Il suffit de faire une boucle infinie d'y mettre un `ctx.clearRect()` au début, afficher des choses, update des objets en fonction du frametime, etc.  
Bref, finalement ça demande un peu d'organisation.
C'est pour cela que parallèlement au développement de **KillDemAll** j'ai choisi de faire les choses bien pour pouvoir réutiliser le même code sur d'autres projets par la suite.

Les fonctionnalités du framework se rangent dans plusieurs catégories:
* Le &lt;canvas&gt; en lui même.
* L'organisation du code utilisateur.
* Les événements.
* Les assets graphiques.
* Le temps.
* Le HUD (en HTML).
* Un système de page (en HTML).
* Les outils mathématiques.
* La surcharge du context 3D.
* La gestion des caméras.

Par la suite, à l'université Laval, nous avons eu a faire un projet 3D en infographie avec *OpenGL* étant donné que nous sommes curieux de ce qui peut se faire de nouveau en **Web** nous avons voulu le faire en *WebGL*. Nous avons eu envie de découvrir l'envers du décors qui se cache derrière *three.js*.  

C'est pourquoi avec Mélanie (Misty) Ducani on a rajoute une nouvelle une nouvelle feature au framework (et pas la moindre) celle de rendre le *context 3D* autant user-friendly que celui en 2D.

Pour rappel, *WebGL* vient sans aucune fonction pour gérer la camera, il y a un nombre incroyable de calculs matriciels à faire...  
En 2D il existe les fonctions `.translate()`, `.scale()` et `.rotate()` pour manipuler les objets dans l'espace.  
On trouve également le couple `.save()` et `.restore()` pour sauvegarder ou remplacer la matrice actuelle.






