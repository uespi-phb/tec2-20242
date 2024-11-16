<p><img src="../images/env.png" width=128 /></p>

># **Code Smells**

Um **code smell** é um indicador de que algo no código pode estar mal projetado ou implementado de forma inadequada, mesmo que ele ainda esteja funcional. Esses "cheiros" geralmente não causam erros imediatos no sistema, mas sinalizam potenciais problemas que podem dificultar a manutenção, a extensibilidade ou a compreensão do código no futuro.

Os code smells não são bugs, mas sim características estruturais que indicam fragilidades no design. Eles sugerem que o código pode ser melhorado através de refatoração, ajudando a alinhar a implementação com boas práticas de desenvolvimento.

#### Características de Code Smells
- **Facilmente Detectáveis**: São padrões ou problemas reconhecíveis no código que um desenvolvedor experiente pode identificar rapidamente.
- **Não Imediatamente Críticos**: Embora não causem falhas imediatas, podem levar a problemas mais graves a longo prazo, como aumento da dívida técnica.
- **Sintomas, Não Causas**: Um code smell geralmente aponta para problemas subjacentes no design ou implementação.

#### Exemplos de Problemas que Code Smells Podem Indicar
- Violações de princípios de design, como o Princípio da Responsabilidade Única (SRP) ou Aberto-Fechado (OCP).
- Alto acoplamento entre componentes.
- Baixo encapsulamento de dados.
- Código difícil de entender, testar ou modificar.

#### Origem do Termo
O termo code smell foi introduzido por Kent Beck no livro Refactoring: Improving the Design of Existing Code de Martin Fowler. Ele usa o termo para descrever "indícios" no código que sugerem a necessidade de refatoração.

#### Importância de Identificar e Resolver Code Smells
- **Manutenção**: Código com muitos smells é difícil de entender e modificar, aumentando os custos de manutenção.
- **Testabilidade**: Code smells dificultam a criação de testes automatizados devido ao design mal estruturado.
- **Escalabilidade**: Um design ruim dificulta a extensão do sistema à medida que os requisitos mudam.

---

### 1. **Long Method (Método Longo)**  
   Métodos com muitas linhas de código se tornam difíceis de entender, testar e manter. Geralmente, indicam que estão realizando muitas tarefas diferentes. Métodos longos podem ser quebrados em métodos menores e mais específicos, que tenham nomes descritivos para melhorar a clareza.  
   - **Exemplo**: Um método que calcula o total de um pedido, aplica descontos, valida o estoque e gera um recibo deveria ser dividido em funções específicas para cada tarefa.

---

### 2. **Large Class (Classe Grande)**  
   Classes com muitos campos, métodos ou responsabilidades violam o princípio da responsabilidade única (SRP). Classes grandes geralmente precisam ser divididas em classes menores, cada uma focada em uma responsabilidade específica.  
   - **Exemplo**: Uma classe `UserManager` que cuida de autenticação, cadastro de usuários e envio de notificações pode ser separada em `AuthenticationService`, `UserRepository` e `NotificationService`.

---

### 3. **God Class (Classe Deus)**  
   Uma "classe deus" centraliza toda a lógica e funcionalidades do sistema. Isso torna o código difícil de testar, modificar e escalar, criando um gargalo no design. A solução é distribuir responsabilidades entre várias classes menores e específicas.  
   - **Exemplo**: Uma classe `OrderProcessor` que lida com estoque, pagamento e envio deveria delegar essas responsabilidades para outras classes.

---

### 4. **Feature Envy (Inveja de Função)**  
   Ocorre quando um método de uma classe usa intensamente os dados de outra classe, em vez de usar os dados e métodos da própria classe. Isso indica que a lógica deveria estar na classe onde os dados residem.  
   - **Exemplo**: Um método `calculateDiscount` em uma classe `Order` que acessa repetidamente os dados da classe `Customer` para calcular o desconto.

---

### 5. **Data Clumps (Agrupamento de Dados)**  
   Dados que frequentemente aparecem juntos em vários lugares do código deveriam ser encapsulados em uma classe ou objeto. Isso melhora a clareza e reduz a duplicação.  
   - **Exemplo**: Os campos `street`, `city`, e `zipCode` sendo usados em vários métodos poderiam ser encapsulados em uma classe `Address`.

---

### 6. **Duplicate Code (Código Duplicado)**  
   Trechos de código idênticos ou quase idênticos aparecem em vários lugares. Isso aumenta o esforço de manutenção, já que uma alteração precisa ser replicada em todos os locais. A solução geralmente é extrair o código duplicado para um método ou classe reutilizável.  
   - **Exemplo**: Funções idênticas de validação de email em várias classes.

---

### 7. **Dead Code (Código Morto)**  
   Código que nunca é executado ou que não é mais necessário. Isso pode ocorrer devido a requisitos antigos ou mudanças de implementação. Remover código morto reduz o ruído e melhora a clareza.  
   - **Exemplo**: Funções ou variáveis declaradas, mas nunca usadas.

---

### 8. **Long Parameter List (Lista Longa de Parâmetros)**  
   Métodos com muitos parâmetros dificultam o entendimento e o uso correto. Uma solução é agrupar parâmetros relacionados em objetos ou classes.  
   - **Exemplo**: Um método `createOrder(customerName, customerAddress, customerPhone, items)` poderia usar um objeto `Customer`.

---

### 9. **Primitive Obsession (Obsessão por Tipos Primitivos)**  
   Uso excessivo de tipos primitivos (`string`, `int`, etc.) em vez de criar tipos ou classes mais específicos para representar conceitos do domínio. Isso pode dificultar a leitura e a manutenção do código.  
   - **Exemplo**: Usar `string` para representar um número de telefone em vez de criar uma classe `PhoneNumber`.

---

### 10. **Switch Statements (Declarações Switch)**  
   Uso frequente de `switch` ou `if-else` para controlar o fluxo pode indicar que o código está violando o princípio aberto-fechado (OCP). A solução muitas vezes é usar polimorfismo.  
   - **Exemplo**: Um `switch` que processa diferentes tipos de pagamento poderia ser substituído por subclasses como `CreditCardPayment` ou `PayPalPayment`.

---

### 11. **Lazy Class (Classe Preguiçosa)**  
   Classes que fazem muito pouco ou nada significativo no sistema. Essas classes podem ser removidas ou fundidas com outras.  
   - **Exemplo**: Uma classe que apenas encapsula um método sem adicionar nenhuma lógica.

---

### 12. **Speculative Generality (Generalização Especulativa)**  
   Código projetado para casos de uso futuros que podem nunca acontecer. Isso adiciona complexidade desnecessária. O princípio KISS (Keep It Simple, Stupid) deve ser seguido.  
   - **Exemplo**: Criar uma hierarquia de classes para lidar com extensões de arquivos quando há apenas um tipo de arquivo sendo usado.

---

### 13. **Temporary Field (Campo Temporário)**  
   Campos de classe que só são usados em situações específicas indicam um design inadequado. Esses campos podem ser movidos para classes mais apropriadas.  
   - **Exemplo**: Um campo `discountRate` que só é usado durante promoções.

---

### 14. **Message Chains (Correntes de Mensagens)**  
   Encadeamento longo de chamadas de métodos torna o código frágil e difícil de entender.  
   - **Exemplo**: `order.getCustomer().getAddress().getCity()` pode ser resolvido encapsulando a lógica diretamente na classe `Order`.

---

### 15. **Middle Man (Homem do Meio)**  
   Classes que delegam quase todas as suas responsabilidades para outra classe tornam-se redundantes.  
   - **Exemplo**: Uma classe que apenas chama métodos de outra sem adicionar valor.

---

### 16. **Inappropriate Intimacy (Intimidade Inapropriada)**  
   Uma classe acessa detalhes internos de outra classe, quebrando o encapsulamento.  
   - **Exemplo**: Uma classe `Order` acessando diretamente os campos privados de `Customer`.

---

### 17. **Divergent Change (Mudança Divergente)**  
   Uma classe que precisa ser alterada por diferentes razões. Isso viola o princípio da responsabilidade única (SRP).  
   - **Exemplo**: Uma classe que lida com validação e persistência de dados.

---

### 18. **Shotgun Surgery (Cirurgia de Espingarda)**  
   Uma alteração em um comportamento requer mudanças em muitas classes. Isso indica acoplamento excessivo.  
   - **Exemplo**: Alterar o formato de exibição de uma data exige modificações em múltiplos lugares.

---

### 19. **Data Class (Classe de Dados)**  
   Classes que apenas armazenam dados sem lógica associada. Elas frequentemente podem ser combinadas com outras classes para encapsular comportamento.  
   - **Exemplo**: Uma classe `CustomerData` que só contém getters e setters.

---

### 20. **Refused Bequest (Herança Recusada)**  
   Subclasses que herdam métodos ou atributos desnecessários de sua superclasse. Isso indica má aplicação de herança.  
   - **Exemplo**: Uma classe `Square` herdando `setWidth` e `setHeight` de `Rectangle`.

---

Essa lista representa apenas parte dos code smells mais frequentes, mas pode ser expandida conforme necessário!