program GestionMatrice;

var
  matrice : array[1..3, 1..4] of integer;
  i, j : integer;

begin
  { Saisie de la matrice }
  for i := 1 to 3 do
    for j := 1 to 4 do
    begin
      write('Element [', i, ',', j, '] : ');
      readln(matrice[i, j]);
    end;

  { Affichage de la matrice }
  writeln('La matrice saisie est :');
  for i := 1 to 3 do
  begin
    for j := 1 to 4 do
    begin
      write(matrice[i, j], ' ');
    end;
    writeln;
  end;
end.