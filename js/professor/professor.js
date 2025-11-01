document.addEventListener('DOMContentLoaded', () => {

    const alunosListBody = document.querySelector('#alunos-list tbody');
    const adminUsersListBody = document.querySelector('#admin-users-list tbody');
    const correcaoFilaListBody = document.querySelector('#correcao-fila-list tbody');
    const correcaoModal = new bootstrap.Modal(document.getElementById('correcaoModal'));
    const editUserModal = new bootstrap.Modal(document.getElementById('editUserModal')); 
    const finalizarCorrecaoBtn = document.getElementById('finalizarCorrecaoBtn');
    const saveUserEditBtn = document.getElementById('saveUserEditBtn');

    let nextAlunoId = 104; 

    let usersAdmin = [
        { id: 101, nome: "Alice de Souza", email: "alice@gabarita.com", status: "Ativo", tipo: "Aluno" },
        { id: 102, nome: "Bruno Ferreira", email: "bruno@gabarita.com", status: "Ativo", tipo: "Aluno" },
        { id: 103, nome: "Carla Miranda", email: "carla@gabarita.com", status: "Inativo", tipo: "Aluno" },
        { id: 201, nome: "Prof. Dolphin", email: "prof@gabarita.com", status: "Ativo", tipo: "Professor" },
        { id: 301, nome: "Admin Gabarita", email: "admin@gabarita.com", status: "Ativo", tipo: "Admin" },
    ];
    
    let filaCorrecao = [
        { id: 501, aluno: "Alice de Souza", tema: "Os desafios da Cibersegurança...", notaIA: 960, texto: "Texto completo da redação de Alice... (Simulação)" },
        { id: 502, aluno: "Bruno Ferreira", tema: "Inteligência Artificial e o futuro do trabalho", notaIA: 880, texto: "Texto completo da redação de Bruno... (Simulação)" },
    ];

    function renderAlunos() {
        const alunos = usersAdmin.filter(u => u.tipo === 'Aluno');
        alunosListBody.innerHTML = '';
        alunos.forEach(aluno => {
            const statusBadge = aluno.status === "Ativo" ? 
                `<span class="badge badge-active">Ativo</span>` : 
                `<span class="badge badge-inactive">Inativo</span>`;
            
            alunosListBody.innerHTML += `
                <tr class="gab-table-row">
                    <td>${aluno.nome}</td>
                    <td>${aluno.email}</td>
                    <td>${statusBadge}</td>
                    <td class="text-end">
                         <button class="btn btn-sm gab-btn-action me-2" onclick="toggleStatus(${aluno.id})"><i class="fas fa-toggle-${aluno.status === 'Ativo' ? 'on' : 'off'}"></i></button>
                         <button class="btn btn-sm gab-btn-action" onclick="openEditUserModal(${aluno.id})"><i class="fas fa-edit"></i></button>
                    </td>
                </tr>
            `;
        });
    }

    function renderAdminUsers() {
        adminUsersListBody.innerHTML = '';
        usersAdmin.forEach(user => {
            const statusBadge = user.status === "Ativo" ? 
                `<span class="badge badge-active">Sim</span>` : 
                `<span class="badge badge-inactive">Não</span>`;
            
            adminUsersListBody.innerHTML += `
                <tr class="gab-table-row">
                    <td>${user.id}</td>
                    <td>${user.nome} (${user.email})</td>
                    <td><span class="badge bg-secondary">${user.tipo}</span></td>
                    <td>${statusBadge}</td>
                    <td class="text-end">
                         <button class="btn btn-sm gab-btn-action me-2" onclick="toggleStatus(${user.id})"><i class="fas fa-toggle-${user.status === 'Ativo' ? 'on' : 'off'}"></i></button>
                         <button class="btn btn-sm gab-btn-action" onclick="openEditUserModal(${user.id})"><i class="fas fa-user-edit"></i></button>
                    </td>
                </tr>
            `;
        });
    }
    
    function renderFilaCorrecao() {
        correcaoFilaListBody.innerHTML = '';
        if (filaCorrecao.length === 0) {
             correcaoFilaListBody.innerHTML = '<tr><td colspan="5" class="text-center text-light">Nenhuma redação aguardando correção humana.</td></tr>';
             return;
        }
       
        filaCorrecao.forEach(item => {
             correcaoFilaListBody.innerHTML += `
                <tr class="gab-table-row">
                    <td>${item.id}</td>
                    <td>${item.aluno}</td>
                    <td>${item.tema}</td>
                    <td class="gab-text-luminous fw-bold">${item.notaIA}</td>
                    <td class="text-end">
                         <button class="btn btn-sm gab-btn-action" onclick="openCorrecaoModal(${item.id})"><i class="fas fa-search me-1"></i> Corrigir</button>
                    </td>
                </tr>
            `;
        });
    }


    document.getElementById('cadastroAlunoForm').addEventListener('submit', function(e) {
        e.preventDefault();
        e.stopPropagation();
        this.classList.add('was-validated');
        
        if (this.checkValidity()) {
            const nome = document.getElementById('nomeAluno').value;
            const email = document.getElementById('emailAluno').value;
            const novoUsuario = { id: nextAlunoId++, nome: nome, email: email, status: "Ativo", tipo: "Aluno" };
            
            usersAdmin.push(novoUsuario);
            renderAlunos();
            renderAdminUsers();
            alert(`Aluno ${nome} cadastrado com sucesso! ID: ${novoUsuario.id}`);
            this.reset();
            this.classList.remove('was-validated');
        }
    });
    

    window.toggleStatus = (id) => {
        let user = usersAdmin.find(u => u.id === id);
        
        if (user) {
             user.status = user.status === 'Ativo' ? 'Inativo' : 'Ativo';
             renderAlunos();
             renderAdminUsers();
             alert(`${user.nome} (${user.tipo}) agora está ${user.status}.`);
        }
    };
    

    window.openEditUserModal = (id) => {
        const user = usersAdmin.find(u => u.id === id);
        if (!user) return;
        
   
        document.getElementById('editUserId').value = user.id;
        document.getElementById('editUserName').value = user.nome;
        document.getElementById('editUserEmail').value = user.email;
        document.getElementById('editUserType').value = user.tipo;
        document.getElementById('editUserStatus').value = user.status;
        
        editUserModal.show();
    };

    saveUserEditBtn.addEventListener('click', () => {
        const id = parseInt(document.getElementById('editUserId').value);
        const user = usersAdmin.find(u => u.id === id);
        const form = document.getElementById('editUserForm');

        form.classList.add('was-validated');

        if (!form.checkValidity()) {
            return;
        }

        if (user) {
            user.nome = document.getElementById('editUserName').value;
            user.email = document.getElementById('editUserEmail').value;
            user.tipo = document.getElementById('editUserType').value;
            user.status = document.getElementById('editUserStatus').value;
            
            
            alert(`Usuário ID ${id} atualizado: ${user.nome} (${user.tipo})`);
            
            renderAlunos();
            renderAdminUsers();
        }
        
        editUserModal.hide();
        form.classList.remove('was-validated');
    });

   
    
    window.openCorrecaoModal = (id) => {
        const item = filaCorrecao.find(i => i.id === id);
        if (!item) return;

        document.getElementById('correcaoTema').textContent = item.tema;
        document.getElementById('correcaoAluno').textContent = item.aluno;
        document.getElementById('correcaoNotaIA').textContent = item.notaIA;
        document.getElementById('correcaoTextoArea').textContent = item.texto;
        document.getElementById('redacaoIdCorrigir').value = item.id;
        document.getElementById('feedbackProfessor').value = ''; 
        
        correcaoModal.show();
    };

    finalizarCorrecaoBtn.addEventListener('click', () => {
        const id = parseInt(document.getElementById('redacaoIdCorrigir').value);
        const feedback = document.getElementById('feedbackProfessor').value.trim();
        const itemIndex = filaCorrecao.findIndex(i => i.id === id);

        if (feedback.length < 50) {
            alert("O feedback do professor deve ter no mínimo 50 caracteres.");
            return;
        }

        correcaoModal.hide();

        console.log(`Salvando Feedback do Professor para Redação ID ${id}: "${feedback.substring(0, 50)}..."`);
        alert(`Correção Humana Finalizada! O backend acionou o n8n para **NOTIFICAR O ALUNO** via e-mail/push com o feedback.`);

        if (itemIndex > -1) {
            filaCorrecao.splice(itemIndex, 1);
        }
        
        renderFilaCorrecao();
    });


    renderAlunos();
    renderAdminUsers();
    renderFilaCorrecao();
});