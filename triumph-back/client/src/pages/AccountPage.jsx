import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useConfirmDelete } from "../hooks/useConfirmDelete";

function AccountPage() {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { openConfirm, Confirm } = useConfirmDelete();

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        setUserData(null);
        setLoading(false);
        return;
      }

      const response = await fetch("/api/account", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (response.status > 399) {
        navigate("/login");
      }

      setUserData(data);
      setLoading(false);
    };

    fetchData();
  }, []);

  if (loading) return null;
  if (!userData) return null;

  const { parent, children = [] } = userData;

  const handleDeleteChild = (childId) => {
    openConfirm("delete-child", async () => {
      const token = localStorage.getItem("token");

      try {
        const response = await fetch(`/api/children/${childId}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Ошибка при удалении ребенка");
        }

        setUserData((prev) => ({
          ...prev,
          children: prev.children.filter((child) => child.id !== childId),
        }));
      } catch (error) {
        console.error("Ошибка удаления:", error);
        alert("Не удалось удалить ребенка");
      }
    });
  };

  const handleEditParent = () => {
    navigate("/account/edit-parent", {
      state: {
        name: parent.name,
        surname: parent.surname,
        phone: parent.phone,
      },
    });
  };

  return (
    <div className="account">
      <h1 className="registration__title">ЛИЧНЫЙ КАБИНЕТ</h1>

      <div className="account-card">
        <div className="account-card__section account-card__section-parent">
          <div className="account-card__info">
            <div className="card__field">
              <span className="card__label">Пользователь:</span>
              <span className="card__value">{parent.name} {parent.surname}</span>
            </div>
            <div className="card__field">
              <span className="card__label">Номер телефона:</span>
              <span className="card__value">{parent.phone}</span>
            </div>
          </div>

          <div className="card__actions">
            <button className="card__icon-button" onClick={handleEditParent}>
              <img src="/icon/edit.svg" alt="Редактировать" />
            </button>
          </div>
        </div>

        <div className="account-card__divider" />

        {children.length > 0 ? (
          children.map((child) => (
            <div key={child.id} className="account-card__section-child">
              <div className="account-card__info">
                <div className="card__field">
                  <span className="card__value">{child.name} {child.surname}</span>
                </div>
                <div className="card__field">
                  <span className="card__label">Дата рождения:</span>
                  <span className="card__value">{child.birthDate}</span>
                </div>
                <div className="card__field">
                  <span className="card__label">Команда:</span>
                  <span className="card__value">{child.team || "–"}</span>
                </div>
                <div className="card__field">
                  <span className="card__label">Расписание:</span>
                  <span className="card__value">{child.schedule || "–"}</span>
                </div>
                <div className="card__field">
                  <span className="card__label">Адрес:</span>
                  <span className="card__value">{child.address || "–"}</span>
                </div>
              </div>

              <div className="card__actions-account">
                <button
                  className="card__icon-button"
                  onClick={() =>
                    navigate("/register/child", {
                      state: {
                        id: child.id,
                        name: child.name,
                        surname: child.surname,
                        birthDate: child.birthDate,
                      },
                    })
                  }
                >
                  <img src="/icon/edit.svg" alt="Редактировать" />
                </button>

                <button
                  className="card__delete"
                  onClick={() => handleDeleteChild(child.id)}
                >
                  <img src="/icon/delete.svg" alt="Удалить" className="card__delete-icon" />
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="card__field">Нет зарегистрированных детей</p>
        )}

        <button
          className="card__add account__add"
          onClick={() => navigate("/register/child")}
        >
          + Добавить ребенка
        </button>
      </div>

      <button
        className="registration__submit-button account__submit-button"
        onClick={() => {
          localStorage.removeItem("token");
          localStorage.removeItem("role");
          navigate("/");
        }}
      >
        Выйти из аккаунта
      </button>

      <Confirm />
    </div>
  );
}

export default AccountPage;
