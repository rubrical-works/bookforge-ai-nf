# Test Strategy: {project-name}

**Last Updated:** {date}

---

## Testing Philosophy

{Brief statement of testing approach and priorities}

---

## Test Pyramid

| Level | Coverage | Approach |
|-------|----------|----------|
| Unit | {target %}  | {framework, style} |
| Integration | {target %} | {approach} |
| E2E | {target %} | {framework, scope} |

---

## Test Types

### Unit Tests

- **Framework:** {test framework}
- **Location:** {test directory}
- **Naming:** {convention}
- **Coverage Target:** {X%}

### Integration Tests

- **Framework:** {test framework}
- **Scope:** {what integrations are tested}
- **Environment:** {test database, mocks, etc.}

### End-to-End Tests

- **Framework:** {E2E framework}
- **Scope:** {critical user flows}
- **Environment:** {staging, docker, etc.}

---

## Quality Gates

| Gate | Criteria | Enforcement |
|------|----------|-------------|
| Pre-commit | | |
| PR Merge | | |
| Release | | |

---

## Test Data Strategy

| Type | Approach |
|------|----------|
| Unit test data | Fixtures / Factories / Inline |
| Integration test data | Seeded DB / Mocks |
| E2E test data | Test environment / Snapshots |

---

## Special Testing Considerations

### Performance Testing

{Approach if applicable, or "Not in scope for MVP"}

### Security Testing

{Approach if applicable, or "Manual review"}

### Accessibility Testing

{Approach if applicable, or "Not applicable"}

---

## Definition of "Tested"

A feature is considered tested when:
- [ ] Unit tests cover core logic
- [ ] Integration tests verify external dependencies
- [ ] E2E tests cover critical paths (if applicable)
- [ ] All tests pass in CI

---

*See also: Charter-Details.md, Constraints.md*
